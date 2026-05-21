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
    try {
        const query = `
            SELECT
                id,
                title_ind,
                title_eng,
                description_ind,
                description_eng,
                thumbnail,
                slug,
                created_at
            FROM blogs
            ORDER BY created_at DESC
        `;

        const params: (number | string)[] = [];

        const [rows] = await dbWeb.query<BlogRow[]>(query, params);

        // Process description to get first sentence only
        const processedRows = rows.map(row => {
            // Function to get first sentence
            const getFirstSentence = (text: string): string => {
                if (!text) return '';
                
                // Match first sentence (ends with . ! ? or max 150 chars)
                const match = text.match(/^[^.!?]+[.!?]/);
                
                if (match) {
                    return match[0].trim() + '..';
                }
                
                // If no sentence ending found, take first 150 chars
                if (text.length > 150) {
                    return text.substring(0, 150).trim() + '...';
                }
                
                return text.trim();
            };

            return {
                id: row.id,
                title_ind: row.title_ind,
                title_eng: row.title_eng,
                description_ind: getFirstSentence(row.description_ind),
                description_eng: getFirstSentence(row.description_eng),
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
        console.error('Error fetching blogs:', error);
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