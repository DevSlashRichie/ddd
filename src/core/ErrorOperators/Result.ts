import { OperationResult } from './OperationResult';

/**
 * Represents a waited error but in a more generic way because it returns a string error.
 */
export class Result<T> extends OperationResult<T, string>{

    private constructor(value: T | null, error: string | null) {
        super(error, value);
    }

    /**
     * Build the error message as an {@link Error}
     */
    public returnAsError() {
        return new Error(this.getError());
    }

    /**
     * Throw the message as an {@link Error}
     */
    public assert() {
        if (this.getError()) {
            throw new Error(this.getError());
        }
    }

    /**
     * Build a valid response with a value.
     * @param value The response object.
     */
    public static accept <U> (value : U) : Result<U> {
        return new Result<U>(value, null);
    }

    /**
     * Fail the response with a message.
     * @param error The message
     */
    public static fail <U> (error: string) : Result<U> {
        return new Result<U>(null, error);
    }

}
