import { MetadataRoute } from 'next';
import dbWeb from '@/lib/db-web';
import { roomData } from '@/data/roomData';
import { RowDataPacket } from 'mysql2';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://tembihistoricalhome.com';

interface SlugRow extends RowDataPacket {
    slug: string;
    updated_at?: string;
    created_at?: string;
}

async function getBlogSlugs(): Promise<SlugRow[]> {
    try {
        const connection = await dbWeb.getConnection();
        const [rows] = await connection.query<SlugRow[]>(
            'SELECT slug, created_at FROM blogs ORDER BY created_at DESC'
        );
        connection.release();
        return rows;
    } catch {
        return [];
    }
}

async function getEventSlugs(): Promise<SlugRow[]> {
    try {
        const connection = await dbWeb.getConnection();
        const [rows] = await connection.query<SlugRow[]>(
            'SELECT slug, created_at FROM event ORDER BY created_at DESC'
        );
        connection.release();
        return rows;
    } catch {
        return [];
    }
}

async function getVenueSlugs(): Promise<SlugRow[]> {
    try {
        const connection = await dbWeb.getConnection();
        const [rows] = await connection.query<SlugRow[]>(
            'SELECT slug, created_at FROM vanue ORDER BY created_at DESC'
        );
        connection.release();
        return rows;
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [blogSlugs, eventSlugs, venueSlugs] = await Promise.all([
        getBlogSlugs(),
        getEventSlugs(),
        getVenueSlugs(),
    ]);

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/rooms`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/venue`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/event`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/catering`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/collections`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/sejarah`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    const roomPages: MetadataRoute.Sitemap = roomData.map((room) => ({
        url: `${BASE_URL}/rooms/${room.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.85,
    }));

    const blogPages: MetadataRoute.Sitemap = blogSlugs.map((row) => ({
        url: `${BASE_URL}/blog/${row.slug}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const eventPages: MetadataRoute.Sitemap = eventSlugs.map((row) => ({
        url: `${BASE_URL}/event/${row.slug}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
    }));

    const venuePages: MetadataRoute.Sitemap = venueSlugs.map((row) => ({
        url: `${BASE_URL}/venue/${row.slug}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticPages, ...roomPages, ...venuePages, ...eventPages, ...blogPages];
}
