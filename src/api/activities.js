import { makeRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getActivitiesByGroupId = async (groupId) => {
    const endpoint = ENDPOINTS.activities.getByGroup.uri + "/" + groupId;
    return makeRequest({ endpoint });
}

export const getActivities = async () => {
    const endpoint = ENDPOINTS.activities.get.uri;
    return makeRequest({ endpoint });
}

export const getActivitiesById = async (id) => {
    const endpoint = ENDPOINTS.activities.getById.uri + "/" + id;
    return makeRequest({ endpoint });
}