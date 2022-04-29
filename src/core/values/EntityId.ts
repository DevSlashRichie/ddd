import { ObjectId } from 'bson';
import { Result } from '../ErrorOperators/Result';

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
     * @param strict If true, it will throw an error if the id is not defined.
     * @throws when used an invalid hexadecimal representation in string.
     */
    constructor(id?: ObjectId | string, strict = false) {
        if(strict && !id)
            throw new Error('EntityId cannot be empty');

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
    
    public static create(id?: ObjectId | string, strict = false): Result<EntityId> {
        try {
            const entityId = new EntityId(id, strict);
            return Result.accept(entityId);
        } catch (_err) {
            const err = _err as Error;
            return Result.fail(err.message);
        }
    }
}