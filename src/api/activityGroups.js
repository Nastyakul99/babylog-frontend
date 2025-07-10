import { makeSimpleRequest, makeRequest } from "./makeRequest"
import { ENDPOINTS } from "./endpoints";

export const getActivityGroups = async () => {
    return makeSimpleRequest(ENDPOINTS.activityGroups.get);
}

export const getActivityGroup = async (groupId) => {
    const endpoint = ENDPOINTS.activityGroups.getById.uri + "/" + groupId;
    return makeRequest({ endpoint });
}