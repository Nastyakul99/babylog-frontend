import { SignedRequest } from "./signedRequest";

export class AddToFamilyRequest extends SignedRequest {

    newMemberId = "";

    constructor(userId, newMemberId) {
        this.newMemberId = newMemberId;
        super(userId);
    }

    _genPayload() {
        return ("userId=" + this.userId
            + ";newMemberId=" + this.newMemberId);
    }
}