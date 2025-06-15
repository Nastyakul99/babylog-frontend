import { makeSimpleRequest } from "./makeRequest"
import { ENDPOINTS } from "./endpoints";

export const addToFamily = async (userId, newMemberId) => {
    return makeSimpleRequest(ENDPOINTS.families.create, userId, newMemberId);
}