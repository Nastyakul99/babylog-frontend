import { HTTP_METHODS } from "./httpMethod";
import { SignedRequest } from "./types/requests/signedRequest"
import { AddToFamilyRequest } from "./types/requests/addToFamilyRequest"

export const ENDPOINTS = {
    persons: {
        get: {
            uri: "persons",
            method: HTTP_METHODS.GET,
            requestClass: SignedRequest
        },
        create: {
            uri: "persons",
            method: HTTP_METHODS.POST,
            requestClass: SignedRequest
        },
    },

    families: {
        add: {
            uri: "families",
            method: HTTP_METHODS.POST,
            requestClass: AddToFamilyRequest
        },
        get: {
            uri: "families",
            method: HTTP_METHODS.GET,
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