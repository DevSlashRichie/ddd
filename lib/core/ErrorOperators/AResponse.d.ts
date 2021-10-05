import { OperationResult } from './OperationResult';
/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
export declare class AResponse<T, E = Error> extends OperationResult<T, E> {
    private constructor();
    /**
     * Build a valid response with a value.
     * @param value The response
     */
    static accept<U>(value: U): AResponse<U>;
    /**
     * Build a valid response without content.
     */
    static acceptEmpty(): AResponse<void>;
    /**
     * Fail a response with an {@link Error}
     * @param error
     */
    static fail<U>(error: Error): AResponse<U>;
    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     */
    static failAny<U>(error: any): AResponse<U>;
    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     * @param internalCode
     * @param networkCode
     */
    static failWithMessage<U>(error: string, internalCode?: number, networkCode?: number): AResponse<U>;
}
