import { makeSimpleRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getBabyById = async (userId, babyId) => {
    return makeSimpleRequest(ENDPOINTS.babies.getById, userId, babyId);
}

export const createBaby = async (userId, baby) => {
    return makeSimpleRequest(ENDPOINTS.babies.create, userId, baby);
}

export const updateBaby = async (userId, baby) => {
    return makeSimpleRequest(ENDPOINTS.babies.update, userId, baby);
}

export const getBabyByPersonVkId = async (userId) => {
    return makeSimpleRequest(ENDPOINTS.babies.getByPersonVkId, userId);
}

export const deleteBaby = async (userId, babyId) => {
    return makeSimpleRequest(ENDPOINTS.babies.delete, userId, babyId);
}