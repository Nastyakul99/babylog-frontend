import { HTTP_METHODS } from "./httpMethod";
import { SignedRequest } from "./types/requests/signedRequest"
import {AddToFamilyRequest} from "./types/requests/addToFamilyRequest"

export const ENDPOINTS = {
    persons: {
        get: {
            uri: "persons",
            metgod: HTTP_METHODS.GET,
            requestClass: SignedRequest
        },
        create: {
            uri: "persons",
            metgod: HTTP_METHODS.POST,
            requestClass: SignedRequest
        },
    },

    families: {
        add: {
            uri: "families",
            method: HTTP_METHODS.POST,
            requestClass: AddToFamilyRequest
        }
    }
}