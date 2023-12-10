export function formatTime(timestamp: number, format: string): string {
    const seconds = (Math.floor(timestamp / 1000) % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(timestamp / 60 / 1000) % 60).toString().padStart(2, '0');
    const hours = (Math.floor(timestamp / 60 / 60 / 1000) % 24).toString().padStart(2, '0');

    return format
        .replace('hh', hours)
        .replace('MM', minutes)
        .replace('ss', seconds);
}
