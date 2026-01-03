import { ALERT_TYPES } from "./AlertTypes";

export class Info {
    constructor(id = -1, text, type = ALERT_TYPES.INFO) {
        this.id = id;
        this.text = text;
        this.type = type
    }
}