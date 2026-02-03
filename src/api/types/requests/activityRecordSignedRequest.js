import { SignedRequest } from "./signedRequest";
import { keysToURI } from "./keysToURI";

export class ActivityRecordSignedRequest extends SignedRequest {

    activityRecord;

    constructor(userId, activityRecord = null) {
        super(userId);
        this.activityRecord = activityRecord;
    }

    _genPayload() {
        let tmp = {...this.activityRecord};
        delete  tmp.type;
        const strKeys = keysToURI(tmp);
        console.log(strKeys);
        return strKeys;
    }
}