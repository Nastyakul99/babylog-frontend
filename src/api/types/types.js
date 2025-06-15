
export class Person {
    id = 0;
    vkId = 0;
    user = {};

    constructor({ id, vkId, user }) {
        this.id = id;
        this.vkId = vkId;
        this.user = user;
    }
}