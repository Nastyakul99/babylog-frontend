import { makeSimpleRequest } from "./makeRequest"
import { ENDPOINTS } from "./endpoints";

export const getActivityGroups = async () => {
    return makeSimpleRequest(ENDPOINTS.activityGroups.get);
}