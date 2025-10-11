import { makeSimpleRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const createRecord = async (userId, record) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.create, userId, record);
}

export const getById = async (userId, id) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.get, userId, id);
}

export const getByBabyId = async (userId, babyId) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.getByBabyId, userId, babyId);
}

export const getByBabyIdAndGroupId = async (userId, babyId, groupId) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.getByBabyIdAndGroupId, userId, babyId, groupId);
}

export const updateRecord = async (userId, record) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.update, userId, record);
}

export const deleteRecord = async (userId, recordId) => {
    return makeSimpleRequest(ENDPOINTS.activityRecords.delete, userId, recordId);
}