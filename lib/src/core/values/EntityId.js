"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * This represents the identifier for an Entity.
 * This one is based on the hex. identifier from mongoose.
 */
class EntityId extends mongoose_1.default.Types.ObjectId {
    /**
     * This constructor is built with a mongoose ObjectID or a string representing the hexadecimal number.
     *
     * @param id Can be a mongoose ObjectId or a string represting the hexadecimal number. It can also be skipped and
     * it will return a new ID.
     * @throws when used an invalid hexadecimal representation in string.
     */
    constructor(id) {
        if (typeof id === "string")
            id = new mongoose_1.default.Types.ObjectId(id);
        super(id ? id : new mongoose_1.default.Types.ObjectId());
    }
}
exports.EntityId = EntityId;
//# sourceMappingURL=EntityId.js.map