import { SignedRequest } from "./signedRequest";
import { keysToURI } from "./keysToURI";

export class ActivityRecordSignedRequest extends SignedRequest {

    activityRecord = null;

    constructor(userId, activityRecord) {
        super(userId);
        this.activityRecord = activityRecord;
    }

    _genPayload() {
        return keysToURI(this.activityRecord);
    }
}