import { makeRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getActivityGroupMetadata = async () => {
    const endpoint = ENDPOINTS.activityGroupMetadata.get.uri;
    return makeRequest({ endpoint });
}