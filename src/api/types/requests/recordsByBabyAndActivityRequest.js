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
        return (`activityId=${this.activityId};babyId=${this.babyId}`);
    }
}