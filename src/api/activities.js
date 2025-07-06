import { makeRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getActivitiesByGroupId = async (groupId) => {
    const endpoint = ENDPOINTS.activities.get.uri + "/" + groupId;
    return makeRequest({ endpoint });
}