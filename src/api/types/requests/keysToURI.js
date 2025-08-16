
export const keysToURI = (data) => {
    return Object.keys(data)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join(";");
}