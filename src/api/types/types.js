
export const GENDER = Object.freeze({
    MALE: "MALE",
    FEMALE: "FEMALE",
    UNDEFINED: "UNDEFINED"
})

export class Person {
    constructor({ id = 0, vkId = 0, user = {} } = {}) {
        this.id = id;
        this.vkId = vkId;
        this.user = user;
    }
}

export class ActivityGroup {
    constructor({ id = 0, name = "", printName = "", img = "" } = {}) {
        this.id = id;
        this.name = name;
        this.printName = printName;
        this.img = img;
    }
}

export class Activity {
    constructor({ id = 0, name = "", printName = "",
        img = "", type = TYPE_ACTIVITY_RECORD.BASE_RECORD } = {}) {
        this.id = id;
        this.name = name;
        this.printName = printName;
        this.img = img;
        this.type = type;
    }
}

export class Baby {
    constructor({ id = 0, name = "", birthDate = "", gender = GENDER.UNDEFINED } = {}) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
    }
}

export const TYPE_ACTIVITY_RECORD = Object.freeze({
    BASE_RECORD: 'BASE_RECORD',
    TIME_RANGE: 'TIME_RANGE',
    TEXT_NOTE: 'TEXT_NOTE'
});

export class ActivityRecord {
    constructor({ id = 0, babyId = 0, activityId = 0, startTime = "" } = {}) {
        this.id = id;
        this.babyId = babyId;
        this.activityId = activityId;
        this.startTime = startTime;
        this.type = TYPE_ACTIVITY_RECORD.BASE_RECORD;
    }
}

export class TextNoteRecord extends ActivityRecord {
    constructor({ id = 0, babyId = 0, activityId = 0, startTime = "", comment = "" } = {}) {
        super({ id, babyId, activityId, startTime });
        this.comment = comment;
        this.type = TYPE_ACTIVITY_RECORD.TEXT_NOTE;
    }
}

export class TimeRangeRecord extends ActivityRecord {
    constructor({ id = 0, babyId = 0, activityId = 0, startTime = "", endTime = "" } = {}) {
        super({ id, babyId, activityId, startTime });
        this.endTime = endTime;
        this.type = TYPE_ACTIVITY_RECORD.TIME_RANGE;
    }
}
//TODO
export const activityRecordFactory = ({ id, type, babyId, activityId, startTime, comment, endTime }) => {
    let record = null;
    switch (type) {
        case TYPE_ACTIVITY_RECORD.TIME_RANGE:
            record = new TimeRangeRecord({
                id: id, babyId: babyId,
                activityId: activityId, startTime: startTime, endTime: endTime
            });
            break;
        case TYPE_ACTIVITY_RECORD.TEXT_NOTE:
            record = new TextNoteRecord({
                id: id, babyId: babyId,
                activityId: activityId, startTime: startTime, comment: comment
            });
            break;
        default:
            record = new ActivityRecord({
                id: id, babyId: babyId,
                activityId: activityId, startTime: startTime
            });
            break;
    }
    return record;
}

