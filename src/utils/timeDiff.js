export const calcTimeDiff = (start, end) => {
    const diffMs = (start && end) ? (end - start) : start;

    const diffHrs = Math.floor(diffMs / (60 * 60 * 1000));
    const diffMin = Math.floor((diffMs - (diffHrs * 60 * 60 * 1000)) / (60 * 1000));
    const diffSec = Math.floor((diffMs - (diffHrs * 60 * 60 * 1000) - (diffMin * 60 * 1000)) / (1000));

    return [diffHrs, diffMin, diffSec];//TODO добавить дни
}

export const getTimeDiff = (start, end) => {
    const [diffHrs, diffMin, diffSec] = calcTimeDiff(start, end);

    const pad = (num) => num.toString().padStart(2, '0');

    return ((diffHrs > 0 ? (pad(diffHrs) + ":") : "")
        + (diffMin > 0 ? (pad(diffMin) + ":") : "00:")
        + (diffSec > 0 ? pad(diffSec) : "00"));
}

export const getTimeDiffUOM = (start, end) => {
    const [diffHrs, diffMin, diffSec] = calcTimeDiff(start, end);
    return ((diffHrs > 0 ? (diffHrs + "ч ") : "")
        + (diffMin > 0 ? (diffMin + "м ") : "")
        + (diffSec > 0 ? (diffSec + "с") : "0с"));
}

