import {OperationResult} from './OperationResult';
import {DError} from "./DError";


/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
export class AResponse<T, E = Error> extends OperationResult<T, E> {

    private constructor(value: T | null, error: E | null) {
        super(error, value);
    }

    /**
     * Build a valid response with a value.
     * @param value The response
     */
    public static accept<U>(value: U): AResponse<U> {
        return new AResponse<U>(value, null);
    }

    /**
     * Build a valid response without content.
     */
    public static acceptEmpty(): AResponse<void> {
        return new AResponse<void>(undefined, null);
    }

    /**
     * Fail a response with an {@link Error}
     * @param error
     */
    public static fail<U>(error: Error): AResponse<U> {
        return new AResponse<U>(null, error);
    }

    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     */
    public static failAny<U>(error: any): AResponse<U> {
        return new AResponse<U>(null, error);
    }

    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     * @param internalCode
     * @param networkCode
     */
    public static failWithMessage<U>(error: string, internalCode?: number, networkCode?: number): AResponse<U> {
        return new AResponse<U>(null, new DError(error, networkCode, internalCode));
    }

}