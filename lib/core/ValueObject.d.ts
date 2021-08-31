/**
 * Just a interface representing the structure of props.
 */
export interface ValueObjectPropsSchema {
    [index: string]: any;
}
/**
 * This represents a controller value.
 * For example: an email, a value Object needs to have a factory method that first, checks a valid email syntax.
 */
export declare abstract class ValueObject<T extends ValueObjectPropsSchema> {
    protected readonly props: T;
    protected constructor(props: T);
    get raw(): T;
}
