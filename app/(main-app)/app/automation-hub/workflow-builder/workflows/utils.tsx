export function formatUpdatedAt(updatedAt: string): string {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffInHours = Math.abs(now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
        const hours = Math.floor(diffInHours);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
}