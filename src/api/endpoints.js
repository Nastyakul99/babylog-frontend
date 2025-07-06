import { HTTP_METHODS } from "./httpMethod";
import { SignedRequest } from "./types/requests/signedRequest"
import { AddToFamilyRequest } from "./types/requests/addToFamilyRequest"

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
            metgod: HTTP_METHODS.POST,
            requestClass: AddToFamilyRequest
        },
        get: {
            uri: "families",
            metgod: HTTP_METHODS.GET,
            requestClass: SignedRequest
        }
    },

    activityGroups: {
        get: {
            uri: "activityGroups",
            method: HTTP_METHODS.GET,
            requestClass: null
        }
    },

    activities: {
        get: {
            uri: "activities/group",
            method: HTTP_METHODS.GET,
            requestClass: null
        }
    }
}