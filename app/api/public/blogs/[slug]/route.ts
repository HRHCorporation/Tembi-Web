import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface BlogDetailRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    thumbnail: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

const stripHtml = (html: string): string => {
    if (!html) return '';
    return html
        .replace(/<[^>]*>/g, '') // Strip HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
};

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

        // Query 1: detail blog by slug
        const detailQuery = `
            SELECT 
                id,
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                created_at,
                updated_at
            FROM blogs
            WHERE slug = ?
            LIMIT 1
        `;

        // Query 2: blog terbaru (exclude yang sedang dibuka)
        const latestQuery = `
            SELECT 
                id,
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                created_at,
                updated_at
            FROM blogs
            WHERE slug != ?
            ORDER BY created_at DESC
            LIMIT 4
        `;

        // Jalankan paralel
        const [
            [detailRows],
            [latestRows]
        ] = await Promise.all([
            dbWeb.query<BlogDetailRow[]>(detailQuery, [slug]),
            dbWeb.query<BlogDetailRow[]>(latestQuery, [slug]),
        ]);

        if (detailRows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                { status: 404 }
            );
        }

        const row = detailRows[0];

        const detail = {
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            description_ind: row.description_ind,
            description_eng: row.description_eng,
            thumbnail: row.thumbnail || "",
            slug: row.slug,
            created_at: row.created_at,
            updated_at: row.updated_at,
        };

        const latest = latestRows.map((r) => ({
            id: r.id,
            title_ind: r.title_ind,
            title_eng: r.title_eng,
            description_ind: getFirstSentence(stripHtml(r.description_ind)),
            description_eng: getFirstSentence(stripHtml(r.description_eng)),
            thumbnail: r.thumbnail || "",
            slug: r.slug,
            created_at: r.created_at,
            updated_at: r.updated_at,
        }));

        return NextResponse.json({
            success: true,
            data: {
                detail,
                latest,
            },
        });

    } catch (error) {
        console.error("Error fetching blog detail:", error);
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