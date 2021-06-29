import mongoose from "mongoose";
/**
 * This represents the identifier for an Entity.
 * This one is based on the hex. identifier from mongoose.
 */
export declare class EntityId extends mongoose.Types.ObjectId {
    /**
     * This constructor is built with a mongoose ObjectID or a string representing the hexadecimal number.
     *
     * @param id Can be a mongoose ObjectId or a string represting the hexadecimal number. It can also be skipped and
     * it will return a new ID.
     * @throws when used an invalid hexadecimal representation in string.
     */
    constructor(id?: mongoose.Types.ObjectId | string);
}
