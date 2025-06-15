
import { HTTP_METHODS } from "../../httpMethod";
import bridge from '@vkontakte/vk-bridge';

export class SignedRequest {

    sign = "";

    ts = 0;

    userId = 0;

    constructor(userId) {
        this.userId = userId;
    }

    async _toSign() {
        try {
            const data = await bridge.send('VKWebAppCreateHash', {
                payload: this._genPayload()
            });
            if (data) {
                this.ts = data.ts;
                this.sign = data.sign;
            }
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * return string
     */
    _genPayload() {
        return ("userId=" + this.userId);
    }

    _createSearchParams() {
        return new URLSearchParams(this).toString();
    }

    /**
     * 
     * @param method 
     * @returns string
     */
    async createRequest(method) {
        await this._toSign();
        if (method === HTTP_METHODS.GET) return this._createSearchParams();
        return JSON.stringify(this);
    }
}