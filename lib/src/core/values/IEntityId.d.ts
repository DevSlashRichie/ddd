/**
 * This is used to build an EntityID with any type.
 * Is just representative since this DDD is oriented for MongoDB.
 * Since I know any database can be used, I also created this object as a reference to be used.
 */
export declare abstract class IEntityId<T> {
    readonly id: T;
    protected constructor(id: T);
}
