"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
const bson_1 = require("bson");
/**
 * This represents the identifier for an Entity.
 * This one is based on the hex. identifier from mongoose.
 */
class EntityId extends bson_1.ObjectId {
    /**
     * This constructor is built with a mongoose ObjectID or a string representing the hexadecimal number.
     *
     * @param id Can be a mongoose ObjectId or a string represting the hexadecimal number. It can also be skipped and
     * it will return a new ID.
     * @throws when used an invalid hexadecimal representation in string.
     */
    constructor(id) {
        if (id && !bson_1.ObjectId.isValid(id))
            throw new Error('Invalid ObjectID given.');
        if (typeof id === "string")
            id = new bson_1.ObjectId(id);
        super(id ? id : new bson_1.ObjectId());
    }
}
exports.EntityId = EntityId;
//# sourceMappingURL=EntityId.js.map