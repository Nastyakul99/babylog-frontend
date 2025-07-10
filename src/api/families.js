import { makeSimpleRequest } from "./makeRequest"
import { ENDPOINTS } from "./endpoints";

export const addToFamily = async (userId, newMemberId) => {
    return makeSimpleRequest(ENDPOINTS.families.add, userId, newMemberId);
}

export const getFamily = async (userId) => {
    return makeSimpleRequest(ENDPOINTS.families.get, userId);
}

export const deleteFromFamily = async (userId, deletedVkId) => {
    return makeSimpleRequest(ENDPOINTS.families.delete, userId, deletedVkId);
}