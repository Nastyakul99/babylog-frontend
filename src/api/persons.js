import { ENDPOINTS } from "./endpoints";
import { makeSimpleRequest } from "./makeRequest";

export const createPerson = async (userId) => {
    return makeSimpleRequest(ENDPOINTS.persons.create, userId);
}