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
export declare abstract class OperationResult<T, E> {
    private readonly error;
    private readonly value;
    protected constructor(error: E | null, value: T | null);
    /**
     * Returns whether this operation was valid or not.
     * In other words, it will returns if an error is not present.
     */
    isSuccess(): boolean;
    /**
     * Returns the expected value.
     * Use {@link isSuccess} first, to check if the operation is either valid or not.
     *
     * @throws If a value is not present, this often happens when the operation failed.
     * @see isSuccess
     */
    getValue(): T;
    /**
     * Returns the expected error.
     * Use {@link isSuccess} first, to check if the operation is either valid or not.
     *
     * @throws If an error is not present, this often happens when the operation was valid.
     * @see isSuccess
     */
    getError(): E;
}
