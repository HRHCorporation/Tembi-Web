import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface EventDetailRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    tagline_ind: string;
    tagline_eng: string;
    short_description_ind: string;
    short_description_eng: string;
    description_ind: string;
    description_eng: string;
    thumbnail: string;
    slug: string;
    event_date: string;
    event_time: string;
    location: string;
    capacity: number;
    price: number;
    included_items_ind: string;
    included_items_eng: string;
    requirements_ind: string;
    requirements_eng: string;
    gallery_images: string;
    created_at: string;
    updated_at: string;
}

/* ======================================================
    GET DATA - Fetch event detail by slug
====================================================== */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        const query = `
            SELECT
                id,
                title_ind,
                title_eng,
                tagline_ind,
                tagline_eng,
                short_description_ind,
                short_description_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                event_date,
                event_time,
                location,
                capacity,
                price,
                included_items_ind,
                included_items_eng,
                requirements_ind,
                requirements_eng,
                gallery_images,
                created_at,
                updated_at
            FROM events
            WHERE slug = ? AND is_active = 1
            LIMIT 1
        `;

        const queryParams: (number | string)[] = [slug];

        const [rows] = await dbWeb.query<EventDetailRow[]>(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event not found"
                },
                { status: 404 }
            );
        }

        const row = rows[0];

        // Parse JSON fields
        const parseJsonField = (field: string | null): string[] => {
            if (!field) return [];
            try {
                return JSON.parse(field);
            } catch {
                return [];
            }
        };

        const result = {
            id: row.id,
            name_ind: row.title_ind,
            name_eng: row.title_eng,
            tagline_ind: row.tagline_ind,
            tagline_eng: row.tagline_eng,
            shortDesc_ind: row.short_description_ind,
            shortDesc_eng: row.short_description_eng,
            description_ind: parseJsonField(row.description_ind),
            description_eng: parseJsonField(row.description_eng),
            imageUrl: row.thumbnail || '',
            slug: row.slug,
            date: row.event_date,
            time: row.event_time,
            location: row.location,
            capacity: row.capacity,
            price: row.price,
            included_ind: parseJsonField(row.included_items_ind),
            included_eng: parseJsonField(row.included_items_eng),
            requirements_ind: parseJsonField(row.requirements_ind),
            requirements_eng: parseJsonField(row.requirements_eng),
            galleryImages: parseJsonField(row.gallery_images),
            created_at: row.created_at,
            updated_at: row.updated_at
        };

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('Error fetching event detail:', error);
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
