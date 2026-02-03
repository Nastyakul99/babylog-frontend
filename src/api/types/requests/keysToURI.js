
export const keysToURI = (data) => {
    console.log(data)
    return Object.keys(data)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join(";");
}