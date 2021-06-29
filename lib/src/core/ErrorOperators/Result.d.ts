import { OperationResult } from "./OperationResult";
/**
 * Represents a waited error but in a more generic way because it returns a string error.
 */
export declare class Result<T> extends OperationResult<T, string> {
    private constructor();
    /**
     * Build the error message as an {@link Error}
     */
    returnAsError(): Error;
    /**
     * Throw the message as an {@link Error}
     */
    assert(): void;
    /**
     * Build a valid response with a value.
     * @param value The response object.
     */
    static accept<U>(value: U): Result<U>;
    /**
     * Fail the response with a message.
     * @param error The message
     */
    static fail<U>(error: string): Result<U>;
}
