import { SignedRequest } from "./signedRequest";
import { keysToURI } from "./keysToURI";

export class BabySignedRequest extends SignedRequest {

    baby = null;

    constructor(userId, baby) {
        super(userId);
        this.baby = baby;
    }

    _genPayload() {
        return keysToURI(this.baby);
    }
}