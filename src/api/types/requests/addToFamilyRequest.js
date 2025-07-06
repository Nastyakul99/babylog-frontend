import { SignedRequest } from "./signedRequest";

export class AddToFamilyRequest extends SignedRequest {

    newMemberId = "";

    constructor(userId, newMemberId) {
        super(userId);
        this.newMemberId = newMemberId;
    }

    _genPayload() {
        return ("newMemberId=" + this.newMemberId);
    }
}