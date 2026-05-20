import { NextRequest, NextResponse } from "next/server";
import dbWeb from "@/lib/db-web";
import { RowDataPacket } from "mysql2";

interface EventRow extends RowDataPacket {
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
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status"); // "upcoming" | "past" | null

        // Validasi nilai status
        if (status !== null && status !== "upcoming" && status !== "past") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid status. Use 'upcoming' or 'past'.",
                },
                { status: 400 }
            );
        }

        // Tentukan kondisi WHERE dan urutan berdasarkan status
        let whereClause = "";
        let orderClause = "ORDER BY created_at DESC"; // default: semua data

        if (status === "upcoming") {
            whereClause = "WHERE DATE(date_event) >= CURDATE()";
            orderClause = "ORDER BY date_event ASC"; // terdekat duluan
        } else if (status === "past") {
            whereClause = "WHERE DATE(date_event) < CURDATE()";
            orderClause = "ORDER BY date_event DESC"; // terbaru duluan
        }

        const query = `
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
            ${whereClause}
            ${orderClause}
        `;

        const [rows] = await dbWeb.query<EventRow[]>(query);

        const getFirstSentence = (text: string): string => {
            if (!text) return "";
            const match = text.match(/^[^.!?]+[.!?]/);
            if (match) return match[0].trim() + "..";
            if (text.length > 150) return text.substring(0, 150).trim() + "...";
            return text.trim();
        };

        const processedRows = rows.map((row) => ({
            id: row.id,
            title_ind: row.title_ind,
            title_eng: row.title_eng,
            about_ind: getFirstSentence(row.description_ind),
            about_eng: getFirstSentence(row.description_eng),
            thumbnail: row.thumbnail || "",
            slug: row.slug,
            hosted_by: row.hosted_by,
            date_event: row.date_event,
            time_event: row.time_event,
        }));

        return NextResponse.json({
            success: true,
            status: status ?? "all",
            data: processedRows,
        });

    } catch (error) {
        console.error("Error fetching event:", error);
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