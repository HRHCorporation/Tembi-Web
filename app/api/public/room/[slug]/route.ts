import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface RoomFacility {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
}

interface RoomGallery {
    id: number;
    image: string;
    is_banner: number;
}

interface RoomPolicy {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
}

interface HouseRule {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
}

interface GroupedPolicies {
    CHECKIN_CHECKOUT: RoomPolicy[];
    CANCELLATION_POLICY: RoomPolicy[];
}

interface RoomDetailRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    subtitle_ind: string;
    subtitle_eng: string;
    description_ind: string;
    description_eng: string;
    number_guest: number;
    spacious_room: number;
    room_price: number;
    slug: string;
    mattress_name: string;
    tiers_name: string;
    imagebanner: string | null;
    facilities: string | RoomFacility[] | null;
    galleries: string | RoomGallery[] | null;
    policies: string | Array<RoomPolicy & { type: string }> | null;
    house_rules: string | HouseRule[] | null;
}

/* ======================================================
    GET DATA - Fetch room detail by slug
====================================================== */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        const query = `
            SELECT 
                room.id,
                room.title_ind,
                room.title_eng,
                room.subtitle_ind,
                room.subtitle_eng,
                room.description_ind,
                room.description_eng,
                room.number_guest,
                room.spacious_room,
                room.room_price,
                room.slug,
                mstr_mattress_room.name as mattress_name,
                mstr_tiers_room.name_id as tiers_name,
                room_gallery_banner.image as imagebanner,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mf.id,
                            'icon', mf.icon,
                            'name_ind', mf.name_ind,
                            'name_eng', mf.name_eng
                        )
                    )
                    FROM room_facilities rf
                    JOIN mstr_fasilities mf ON mf.id = rf.facilities_id
                    WHERE rf.room_id = room.id
                ) as facilities,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', rg.id,
                            'image', rg.image,
                            'is_banner', rg.is_banner
                        )
                    )
                    FROM room_gallery rg
                    WHERE rg.room_id = room.id
                    ORDER BY rg.is_banner DESC, rg.created_at DESC
                ) as galleries,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mrp.id,
                            'icon', mrp.icon,
                            'name_ind', mrp.name_ind,
                            'name_eng', mrp.name_eng,
                            'type', mrp.type
                        )
                    )
                    FROM room_policies rp
                    JOIN mstr_room_policies mrp ON mrp.id = rp.policies_id
                    WHERE rp.room_id = room.id
                ) as policies,
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mhr.id,
                            'icon', mhr.icon,
                            'name_ind', mhr.name_ind,
                            'name_eng', mhr.name_eng
                        )
                    )
                    FROM room_rules rr
                    JOIN mstr_house_rules mhr ON mhr.id = rr.house_rules_id
                    WHERE rr.room_id = room.id
                ) as house_rules
            FROM room
            LEFT JOIN mstr_mattress_room 
                ON mstr_mattress_room.id = room.matters_id
            LEFT JOIN mstr_tiers_room 
                ON mstr_tiers_room.id = room.tiers_id
            LEFT JOIN room_gallery as room_gallery_banner
                ON room_gallery_banner.room_id = room.id 
                AND room_gallery_banner.is_banner = 1
            WHERE room.slug = ?
            LIMIT 1
        `;

        const queryParams: (number | string)[] = [slug];

        const [rows] = await dbWeb.query<RoomDetailRow[]>(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Room not found"
                },
                { status: 404 }
            );
        }

        const row = rows[0];

        // Parse JSON fields
        let facilities: RoomFacility[] = [];
        let galleries: RoomGallery[] = [];
        let policiesRaw: Array<RoomPolicy & { type: string }> = [];
        let house_rules: HouseRule[] = [];

        // Parse facilities
        if (row.facilities) {
            if (typeof row.facilities === 'string') {
                try {
                    facilities = JSON.parse(row.facilities);
                } catch (e) {
                    facilities = [];
                }
            } else {
                facilities = row.facilities as RoomFacility[];
            }
            if (Array.isArray(facilities)) {
                facilities = facilities.filter(f => f && f.id !== null);
            }
        }

        // Parse galleries
        if (row.galleries) {
            if (typeof row.galleries === 'string') {
                try {
                    galleries = JSON.parse(row.galleries);
                } catch (e) {
                    galleries = [];
                }
            } else {
                galleries = row.galleries as RoomGallery[];
            }
            if (Array.isArray(galleries)) {
                galleries = galleries.filter(g => g && g.id !== null);
            }
        }

        // Parse policies
        if (row.policies) {
            if (typeof row.policies === 'string') {
                try {
                    policiesRaw = JSON.parse(row.policies);
                } catch (e) {
                    policiesRaw = [];
                }
            } else {
                policiesRaw = row.policies as Array<RoomPolicy & { type: string }>;
            }
            if (Array.isArray(policiesRaw)) {
                policiesRaw = policiesRaw.filter(p => p && p.id !== null);
            }
        }

        // Group policies by type
        const groupedPolicies: GroupedPolicies = {
            CHECKIN_CHECKOUT: [],
            CANCELLATION_POLICY: []
        };

        policiesRaw.forEach(policy => {
            const { type, ...policyWithoutType } = policy;
            if (type === 'CHECKIN_CHECKOUT') {
                groupedPolicies.CHECKIN_CHECKOUT.push(policyWithoutType);
            } else if (type === 'CANCELLATION_POLICY') {
                groupedPolicies.CANCELLATION_POLICY.push(policyWithoutType);
            }
        });

        // Parse house_rules
        if (row.house_rules) {
            if (typeof row.house_rules === 'string') {
                try {
                    house_rules = JSON.parse(row.house_rules);
                } catch (e) {
                    house_rules = [];
                }
            } else {
                house_rules = row.house_rules as HouseRule[];
            }
            if (Array.isArray(house_rules)) {
                house_rules = house_rules.filter(h => h && h.id !== null);
            }
        }

        const result = {
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            subtitle_ind: row.subtitle_ind,
            subtitle_eng: row.subtitle_eng,
            description_ind: row.description_ind,
            description_eng: row.description_eng,
            number_guest: row.number_guest,
            spacious_room: row.spacious_room,
            room_price: row.room_price,
            slug: row.slug,
            mattress_name: row.mattress_name || '',
            tiers_name: row.tiers_name || '',
            imagebanner: row.imagebanner || '',
            facilities: facilities,
            galleries: galleries,
            policies: groupedPolicies,
            house_rules: house_rules
        };

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('Error fetching room detail:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}