import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface EventDetailRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    thumbnail: string;
    slug: string;
    hosted_by: string;
    date_event: string;
    time_event: string;
    created_at: string;
    updated_at: string;
}

const getFirstSentence = (text: string): string => {
    if (!text) return "";
    const match = text.match(/^[^.!?]+[.!?]/);
    if (match) return match[0].trim() + "..";
    if (text.length > 150) return text.substring(0, 150).trim() + "...";
    return text.trim();
};

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        // Query 1: detail event by slug
        const detailQuery = `
            SELECT 
                id,
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                hosted_by,
                date_event,
                time_event,
                created_at,
                updated_at
            FROM event
            WHERE slug = ?
            LIMIT 1
        `;

        // Query 2: upcoming events (exclude event yang sedang dibuka)
        const upcomingQuery = `
            SELECT 
                id,
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                hosted_by,
                date_event,
                time_event
            FROM event
            WHERE DATE(date_event) >= CURDATE()
              AND slug != ?
            ORDER BY date_event ASC
            LIMIT 4
        `;

        // Jalankan kedua query secara paralel
        const [
            [detailRows],
            [upcomingRows]
        ] = await Promise.all([
            dbWeb.query<EventDetailRow[]>(detailQuery, [slug]),
            dbWeb.query<EventDetailRow[]>(upcomingQuery, [slug]),
        ]);

        if (detailRows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event not found",
                },
                { status: 404 }
            );
        }

        const row = detailRows[0];

        const detail = {
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            about_ind: row.description_ind,
            about_eng: row.description_eng,
            thumbnail: row.thumbnail || "",
            slug: row.slug,
            hosted_by: row.hosted_by,
            date_event: row.date_event,
            time_event: row.time_event,
            created_at: row.created_at,
            updated_at: row.updated_at,
        };

        const upcoming = upcomingRows.map((r) => ({
            id: r.id,
            title_ind: r.title_ind,
            title_eng: r.title_eng,
            about_ind: getFirstSentence(r.description_ind),
            about_eng: getFirstSentence(r.description_eng),
            thumbnail: r.thumbnail || "",
            slug: r.slug,
            hosted_by: r.hosted_by,
            date_event: r.date_event,
            time_event: r.time_event,
        }));

        return NextResponse.json({
            success: true,
            data: {
                detail,
                upcoming,
            },
        });

    } catch (error) {
        console.error("Error fetching event detail:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}