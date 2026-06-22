// Hapus semua tag HTML
export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

export function truncateText(text: string, maxLength: number = 50): string {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    const safeText = lastSpaceIndex > 0
        ? truncated.slice(0, lastSpaceIndex)
        : truncated;

    return `${safeText}...`;
}

// Helper gabungan: strip HTML lalu truncate
export function truncateHtml(html: string, maxLength: number = 50): string {
    const plainText = stripHtml(html);
    return truncateText(plainText, maxLength);
}