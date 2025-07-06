
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

export class ActivityGroup {
    id = 0;
    name = "";
    printName = "";
    img = "";

    constructor({ id, name, printName, img }) {
        this.id = id;
        this.name = name;
        this.printName = printName;
        this.img = img;
    }
}

export class Activity {
    id = 0;
    name = "";
    printName = "";
    img = "";

    constructor({ id, name, printName, img }) {
        this.id = id;
        this.name = name;
        this.printName = printName;
        this.img = img;
    }
}