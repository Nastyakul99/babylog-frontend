import { SignedRequest } from "./signedRequest";

export class SubIdRequest extends SignedRequest {

    subId = "";

    constructor(userId, newMemberId) {
        super(userId);
        this.subId = newMemberId;
    }

    _genPayload() {
        return ("subId=" + this.subId);
    }
}