import { EntityId } from './values/EntityId';

/**
 * This class is used to build an Entity inside the business core.
 * @T Represents the props that will include this entity, remember this should only be primitive vars. or ValueObject.
 */
export abstract class Entity<T> {
    protected readonly _id: EntityId;
    public readonly props: T;

    protected constructor(props: T, id?: EntityId) {
        this._id = id ? id : new EntityId();
        this.props = props;
    }

    /**
     * @returns the  id representing this EntityId
     * @see EntityId
     */
    public getId() {
        return this._id;
    }

}