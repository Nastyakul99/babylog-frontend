import { makeRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getActivityMetadata = async () => {
    const endpoint = ENDPOINTS.activityMetadata.get.uri;
    return makeRequest({ endpoint });
}