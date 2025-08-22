
export const parseToIntOrNull = (value) => {
    if (value === null || value === undefined) {
        return null;
    }
    const str = String(value).trim();

    if (str === "" || str.toLowerCase() === "null") {
        return null;
    }
    const num = parseInt(str, 10);

    return isNaN(num) ? null : num;
}