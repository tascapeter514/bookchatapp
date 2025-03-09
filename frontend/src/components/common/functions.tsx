




export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.getDate();
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return { day, month, year }
}

export function weeksAgo(date: string) {
    if (date) {

        const now = new Date()
        const lastVisit = new Date(date)
        const timeDiff = now.getTime() - lastVisit.getTime()
        const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7))
        return weeksDiff

    }
}