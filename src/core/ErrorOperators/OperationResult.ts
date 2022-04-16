
/**
 *
 * An "OperationResult", represents an expected error.
 * Use this when trying to execute something that might returns an error
 * that happens while executing the expected flow.
 *
 * Please note, this class is abstract, you need to build an error type.
 *
 * @T Is the expected valid value.
 * @E Is the type of error that you are excepting, this can be any kind of type.
 *
 */
export abstract class OperationResult<T, E> {

    private readonly error: E | null;
    private readonly value: T | null

    protected constructor(error: E | null, value: T | null) {
        this.error = error;
        this.value = value;
    }

    /**
     * Returns whether this operation was valid or not.
     * In other words, it will returns if an error is not present.
     */
    public isSuccess() : boolean {
        return !this.error;
    }

    /**
     * Returns the expected value.
     * Use {@link isSuccess} first, to check if the operation is either valid or not.
     *
     * @throws If a value is not present, this often happens when the operation failed.
     * @see isSuccess
     */
    public getValue() : T {
        if (this.value === null)
            throw new Error('This wasn\'t a successful result, you can\'t use this method.');
        return this.value;
    }

    /**
     * Returns the expected error.
     * Use {@link isSuccess} first, to check if the operation is either valid or not.
     *
     * @throws If an error is not present, this often happens when the operation was valid.
     * @see isSuccess
     */
    public getError() : E {
        if (this.error === null)
            throw new Error('This was a successful result, you can\'t use this method.');
        return this.error;
    }

}