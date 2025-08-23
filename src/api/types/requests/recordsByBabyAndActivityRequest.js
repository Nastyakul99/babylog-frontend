import { SignedRequest } from "./signedRequest";

export class RecordsByBabyAndActivityRequest extends SignedRequest {
    babyId;
    activityId;

    constructor(userId, babyId, activityId) {
        super(userId);
        this.babyId = babyId;
        this.activityId = activityId
    }

    _genPayload() {
        return (`babyId=${this.babyId};activityId=${this.activityId}`);
    }
}