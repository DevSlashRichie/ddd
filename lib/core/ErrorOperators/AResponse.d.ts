import { OperationResult } from './OperationResult';
/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
export declare class AResponse<T, E = Error> extends OperationResult<T, E> {
    private readonly code;
    private constructor();
    /**
     * Returns the designed error code for this error handler.
     */
    getErrorCode(): number;
    /**
     * Build a valid response with a value.
     * @param value The response
     * @param code HTTP Response code
     */
    static accept<U>(value: U, code?: number): AResponse<U>;
    /**
     * Build a valid response without content.
     */
    static acceptEmpty(code?: number): AResponse<void>;
    /**
     * Fail a response with an {@link Error}
     * @param error
     * @param code
     */
    static fail<U>(error: Error, code?: number): AResponse<U>;
    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     * @param code HTTP Response code
     */
    static failAny<U>(error: any, code?: number): AResponse<U>;
    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     * @param code HTTP Response Code
     */
    static failWithMessage<U>(error: string, code?: number): AResponse<U>;
}
