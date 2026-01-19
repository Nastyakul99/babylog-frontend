
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
            let data;
            // eslint-disable-next-line no-undef
            if (process.env.REACT_APP_AUTH === "true") {
                data = await bridge.send('VKWebAppCreateHash', {
                    payload: this._genPayload()
                });
            } else {
                data = {
                    "sign": "V-GC3jQGNhXZINqzhdTvgd4KKgrQI_04VAO4imKvqQM",
                    "ts": 1758099274,
                    "payload": "userId=382798664"
                }
            }
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