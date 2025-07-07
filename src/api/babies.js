import { makeSimpleRequest } from "./makeRequest";
import { ENDPOINTS } from "./endpoints";

export const getById = async (userId, babyId) => {
    return makeSimpleRequest(ENDPOINTS.babies.getById, userId, babyId);
}

export const create = async (userId, baby) => {
    return makeSimpleRequest(ENDPOINTS.babies.create, userId, baby);
}

export const update = async (userId, baby) => {
    return makeSimpleRequest(ENDPOINTS.babies.update, userId, baby);
}

export const getByPersonVkId = async (userId) => {
    return makeSimpleRequest(ENDPOINTS.babies.getByPersonVkId, userId);
}

export const deleteBaby = async (userId, babyId) => {
    return makeSimpleRequest(ENDPOINTS.babies.delete, userId, babyId);
}