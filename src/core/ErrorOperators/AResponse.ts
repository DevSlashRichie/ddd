import { OperationResult } from './OperationResult';


/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
export class AResponse<T, E = Error> extends OperationResult<T, E> {

    private readonly code: number;

    private constructor(value: T | null, error: E | null, code: number = 500) {
        super(error, value);
        this.code = code;
    }

    /**
     * Returns the designed error code for this error handler.
     */
    public getErrorCode() : number {
        return this.code;
    }

    /**
     * Build a valid response with a value.
     * @param value The response
     * @param code HTTP Response code
     */
    public static accept<U>(value: U, code?: number): AResponse<U> {
        return new AResponse<U>(value, null, code);
    }

    /**
     * Build a valid response without content.
     */
    public static acceptEmpty(code?: number): AResponse<void> {
        return new AResponse<void>(undefined, null, code);
    }

    /**
     * Fail a response with an {@link Error}
     * @param error
     * @param code
     */
    public static fail<U>(error: Error, code?: number): AResponse<U> {
        return new AResponse<U>(null, error);
    }

    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     * @param code HTTP Response code
     */
    public static failAny<U>(error: any, code?: number): AResponse<U> {
        return new AResponse<U>(null, error, code);
    }

    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     * @param code HTTP Response Code
     */
    public static failWithMessage<U>(error: string, code?: number): AResponse<U> {
        return new AResponse<U>(null, new Error(error), code);
    }

}