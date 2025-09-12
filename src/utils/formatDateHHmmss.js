export const formatDateHHmmss = (date) => {
    return date.toISOString().substring(0, 19);
}

export const formatDayMonthName = (date) => {
    return new Intl.DateTimeFormat('ru', {
        weekday: 'short',
        year: '2-digit',
        month: 'long',
        day: 'numeric'
    }).format(date)
}

export const formatHHmmss = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}