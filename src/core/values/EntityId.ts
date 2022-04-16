import { ObjectId } from 'bson';

/**
 * This represents the identifier for an Entity.
 * This one is based on the hex. identifier from mongoose.
 */
export class EntityId extends ObjectId {
    /**
     * This constructor is built with a mongoose ObjectID or a string representing the hexadecimal number.
     *
     * @param id Can be a mongoose ObjectId or a string represting the hexadecimal number. It can also be skipped, and
     * it will return a new ID.
     * @throws when used an invalid hexadecimal representation in string.
     */
    constructor(id?: ObjectId | string) {
        if(id && !ObjectId.isValid(id))
            throw new Error('Invalid ObjectID given.');

        if (typeof id === 'string')
            id = new ObjectId(id);
        super(id ? id : new ObjectId());
    }

    eq(id: EntityId | string): boolean {
        if(typeof id === 'string')
            id = new EntityId(id);

        if(id === this)
            return true;

        return this.id.equals(id.id);
    }
}