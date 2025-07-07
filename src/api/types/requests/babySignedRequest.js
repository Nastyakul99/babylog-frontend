import { SignedRequest } from "./signedRequest";

export class BabySignedRequest extends SignedRequest {

    baby = null;

    constructor(userId, baby) {
        super(userId);
        this.baby = baby;
    }

    _genPayload() {
        return ("baby=" + this.baby);
    }
}