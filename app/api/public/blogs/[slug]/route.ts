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

/* ======================================================
    GET DATA - Fetch blog detail by slug
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

        const queryParams: (number | string)[] = [slug];

        const [rows] = await dbWeb.query<BlogDetailRow[]>(query, queryParams);

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found"
                },
                { status: 404 }
            );
        }

        const row = rows[0];

        const result = {
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            description_ind: row.description_ind,
            description_eng: row.description_eng,
            thumbnail: row.thumbnail || '',
            slug: row.slug,
            created_at: row.created_at,
            updated_at: row.updated_at
        };

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('Error fetching blog detail:', error);
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