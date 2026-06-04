import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface BlogRow extends RowDataPacket {
    id: number;
    title_ind: string;
    title_eng: string;
    description_ind: string;
    description_eng: string;
    thumbnail: string;
    slug: string;
    created_at: string;
}

/* ======================================================
    GET DATA - Fetch all blogs
====================================================== */
export async function GET(request: NextRequest) {
    const connection = await dbWeb.getConnection();

    try {
        const [rows] = await connection.query<BlogRow[]>(
            `SELECT id, title_ind, title_eng, description_ind, description_eng,
                thumbnail, slug, created_at
            FROM blogs
            ORDER BY created_at DESC`
        );

        const processedRows = rows.map(row => {
            // Function to strip HTML tags and decode basic HTML entities
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

            // Function to get first sentence
            const getFirstSentence = (text: string): string => {
                if (!text) return '';

                const match = text.match(/^[^.!?]+[.!?]/);

                if (match) {
                    return match[0].trim() + '..';
                }

                if (text.length > 150) {
                    return text.substring(0, 150).trim() + '...';
                }

                return text.trim();
            };

            return {
                id: row.id,
                title_ind: row.title_ind,
                title_eng: row.title_eng,
                description_ind: getFirstSentence(stripHtml(row.description_ind)),
                description_eng: getFirstSentence(stripHtml(row.description_eng)),
                thumbnail: row.thumbnail || '',
                slug: row.slug,
                created_at: row.created_at
            };
        });

        return NextResponse.json({
            success: true,
            data: processedRows,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch data",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    } finally {
        connection.release();
    }
}