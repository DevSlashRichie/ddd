import { EntityId } from "./values/EntityId";
/**
 * This class is used to build an Entity inside the business core.
 * @T Represents the props that will include this entity, remember this should only be primitive vars. or ValueObject.
 */
export declare abstract class Entity<T> {
    protected readonly _id: EntityId;
    readonly props: T;
    protected constructor(props: T, id?: EntityId);
    /**
     * @returns the  id representing this EntityId
     * @see EntityId
     */
    getId(): EntityId;
}
