import { HTTP_METHODS } from "./httpMethod";
import { SignedRequest } from "./types/requests/signedRequest"
import { BabySignedRequest } from "./types/requests/babySignedRequest";
import { SubIdRequest } from "./types/requests/subIdRequest";
import { ActivityRecordSignedRequest } from "./types/requests/activityRecordSignedRequest";
import { RecordsByBabyAndActivityRequest } from "./types/requests/recordsByBabyAndActivityRequest";

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
            requestClass: SubIdRequest
        },
        get: {
            uri: "families",
            method: HTTP_METHODS.GET,
            requestClass: SignedRequest
        },
        delete: {
            uri: "families",
            method: HTTP_METHODS.DELETE,
            requestClass: SubIdRequest
        }
    },

    activityGroups: {
        get: {
            uri: "activityGroups",
            method: HTTP_METHODS.GET,
            requestClass: null
        },
        getById: {
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
    },

    babies: {
        create: {
            uri: "babies",
            method: HTTP_METHODS.POST,
            requestClass: BabySignedRequest
        },
        update: {
            uri: "babies",
            method: HTTP_METHODS.PUT,
            requestClass: BabySignedRequest
        },
        get: {
            uri: "babies",
            method: HTTP_METHODS.GET,
            requestClass: SubIdRequest
        },
        getByPersonVkId: {
            uri: "babies/person",
            method: HTTP_METHODS.GET,
            requestClass: SignedRequest
        },
        delete: {
            uri: "babies",
            method: HTTP_METHODS.DELETE,
            requestClass: SubIdRequest
        }
    },
    activityRecords: {
        create: {
            uri: "activityRecords",
            method: HTTP_METHODS.POST,
            requestClass: ActivityRecordSignedRequest
        },
        getByBabyId: {
            uri: "activityRecords/baby",
            method: HTTP_METHODS.GET,
            requestClass: SubIdRequest
        },
        getByBabyIdAndActivityId: {
            uri: "activityRecords/baby/activity",
            method: HTTP_METHODS.GET,
            requestClass: RecordsByBabyAndActivityRequest
        },
        update: {
            uri: "activityRecords",
            method: HTTP_METHODS.PUT,
            requestClass: ActivityRecordSignedRequest
        },
        delete: {
            uri: "activityRecords",
            method: HTTP_METHODS.DELETE,
            requestClass: SubIdRequest
        }
    }
}