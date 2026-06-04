import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface VenueKey {
    id: number;
    icon: string;
    label_ind: string;
    label_eng: string;
    value_ind: string;
    value_eng: string;
}

interface VenueFacility {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    icon: string;
}

interface VenueFacilityAddOn {
    id: number;
    icon: string;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
}

interface VenueGallery {
    id: number;
    image: string;
    is_banner: number;
}

interface VenueDetailRow extends RowDataPacket {
    id: number;
    name_ind: string;
    name_eng: string;
    description_ind: string;
    description_eng: string;
    slug: string;
    imagebanner: string | null;
    venue_keys: string | VenueKey[] | null;
    facilities: string | VenueFacility[] | null;
    facility_add_ons: string | VenueFacilityAddOn[] | null;
    preview_images: string | VenueGallery[] | null;
    all_galleries: string | VenueGallery[] | null;
}

/* ======================================================
    GET DATA - Fetch venue detail by slug
====================================================== */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const connection = await dbWeb.getConnection();
    try {
        const { slug } = await context.params;

        const query = `
            SELECT
                v.id,
                v.name_ind,
                v.name_eng,
                v.description_ind,
                v.description_eng,
                v.slug,
                vanue_gallery_banner.image as imagebanner,
                venue_keys_agg.venue_keys,
                facilities_agg.facilities,
                facility_add_ons_agg.facility_add_ons,
                preview_images_agg.preview_images,
                all_galleries_agg.all_galleries
            FROM
                vanue v
            LEFT JOIN vanue_gallery as vanue_gallery_banner
                ON
                vanue_gallery_banner.vanue_id = v.id
                AND vanue_gallery_banner.is_banner = 1
            LEFT JOIN (
                SELECT
                    vanue_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', id,
                            'icon', icon,
                            'label_ind', label_ind,
                            'label_eng', label_eng,
                            'value_ind', value_ind,
                            'value_eng', value_eng
                        )
                    ) as venue_keys
                FROM
                    venue_keys
                GROUP BY
                    vanue_id
            ) as venue_keys_agg
                ON
                venue_keys_agg.vanue_id = v.id
            LEFT JOIN (
                SELECT
                    vf.vanue_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mvf.id,
                            'name_ind', mvf.name_ind,
                            'name_eng', mvf.name_eng,
                            'description_ind', mvf.description_ind,
                            'description_eng', mvf.description_eng,
                            'icon', mvf.icon
                        )
                    ) as facilities
                FROM
                    vanue_facilities vf
                JOIN mstr_vanue_facilities mvf 
                    ON
                    mvf.id = vf.mstr_vanue_facilities
                WHERE
                    vf.is_add_ons = 0
                GROUP BY
                    vf.vanue_id
            ) as facilities_agg
                ON
                facilities_agg.vanue_id = v.id
            LEFT JOIN (
                SELECT
                    vf.vanue_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', mvf.id,
                            'icon', mvf.icon,
                            'name_ind', mvf.name_ind,
                            'name_eng', mvf.name_eng,
                            'description_ind', mvf.description_ind,
                            'description_eng', mvf.description_eng
                        )
                    ) as facility_add_ons
                FROM
                    vanue_facilities vf
                JOIN mstr_vanue_facilities mvf 
                    ON
                    mvf.id = vf.mstr_vanue_facilities
                WHERE
                    vf.is_add_ons = 1
                GROUP BY
                    vf.vanue_id
            ) as facility_add_ons_agg
                ON
                facility_add_ons_agg.vanue_id = v.id
            LEFT JOIN (
                SELECT
                    vanue_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', id,
                            'image', image,
                            'is_banner', is_banner
                        )
                    ) as preview_images
                FROM
                    (
                    SELECT
                        vg.vanue_id,
                        vg.id,
                        vg.image,
                        vg.is_banner,
                        @row_num := IF(@prev_vanue = vg.vanue_id, @row_num + 1, 1) AS rn,
                        @prev_vanue := vg.vanue_id
                    FROM
                        vanue_gallery vg
                    CROSS JOIN (
                        SELECT
                            @row_num := 0,
                            @prev_vanue := NULL) vars
                    WHERE
                        vg.is_banner = 0
                    ORDER BY
                        vg.vanue_id,
                        RAND()
                ) as ranked
                WHERE
                    rn <= 3
                GROUP BY
                    vanue_id
            ) as preview_images_agg
                ON
                preview_images_agg.vanue_id = v.id
            LEFT JOIN (
                SELECT
                    vanue_id,
                    CONCAT('[',
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', id,
                                'image', image,
                                'is_banner', is_banner
                            )
                            ORDER BY is_banner DESC, created_at DESC
                            SEPARATOR ','
                        ),
                    ']') as all_galleries
                FROM
                    vanue_gallery
                GROUP BY
                    vanue_id
            ) as all_galleries_agg
                ON
                all_galleries_agg.vanue_id = v.id
            WHERE
                v.slug = ?
            LIMIT 1
        `;

        const queryParams: (number | string)[] = [slug];

        const [rows] = await connection.query<VenueDetailRow[]>(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Venue not found"
                },
                { status: 404 }
            );
        }

        const row = rows[0];

        // Parse JSON fields
        let keys: VenueKey[] = [];
        let facilities: VenueFacility[] = [];
        let facility_add_ons: VenueFacilityAddOn[] = [];
        let preview_images: VenueGallery[] = [];
        let all_galleries: VenueGallery[] = [];

        // Parse venue_keys
        if (row.venue_keys) {
            if (typeof row.venue_keys === 'string') {
                try {
                    keys = JSON.parse(row.venue_keys);
                } catch (e) {
                    keys = [];
                }
            } else {
                keys = row.venue_keys as VenueKey[];
            }
            if (Array.isArray(keys)) {
                keys = keys.filter(k => k && k.id !== null);
            }
        }

        // Parse facilities
        if (row.facilities) {
            if (typeof row.facilities === 'string') {
                try {
                    facilities = JSON.parse(row.facilities);
                } catch (e) {
                    facilities = [];
                }
            } else {
                facilities = row.facilities as VenueFacility[];
            }
            if (Array.isArray(facilities)) {
                facilities = facilities.filter(f => f && f.id !== null);
            }
        }

        // Parse facility_add_ons
        if (row.facility_add_ons) {
            if (typeof row.facility_add_ons === 'string') {
                try {
                    facility_add_ons = JSON.parse(row.facility_add_ons);
                } catch (e) {
                    facility_add_ons = [];
                }
            } else {
                facility_add_ons = row.facility_add_ons as VenueFacilityAddOn[];
            }
            if (Array.isArray(facility_add_ons)) {
                facility_add_ons = facility_add_ons.filter(f => f && f.id !== null);
            }
        }

        // Parse preview_images
        if (row.preview_images) {
            if (typeof row.preview_images === 'string') {
                try {
                    preview_images = JSON.parse(row.preview_images);
                } catch (e) {
                    preview_images = [];
                }
            } else {
                preview_images = row.preview_images as VenueGallery[];
            }
            if (Array.isArray(preview_images)) {
                preview_images = preview_images.filter(g => g && g.id !== null);
            }
        }

        // Parse all_galleries
        if (row.all_galleries) {
            if (typeof row.all_galleries === 'string') {
                try {
                    all_galleries = JSON.parse(row.all_galleries);
                } catch (e) {
                    all_galleries = [];
                }
            } else {
                all_galleries = row.all_galleries as VenueGallery[];
            }
            if (Array.isArray(all_galleries)) {
                all_galleries = all_galleries.filter(g => g && g.id !== null);
            }
        }

        const result = {
            id: row.id,
            name_ind: row.name_ind,
            name_eng: row.name_eng,
            description_ind: row.description_ind,
            description_eng: row.description_eng,
            slug: row.slug,
            imagebanner: row.imagebanner || '',
            keys: keys,
            facilities: facilities,
            facility_add_ons: facility_add_ons,
            preview_images: preview_images,
            all_galleries: all_galleries
        };

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('Error fetching venue detail:', error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}