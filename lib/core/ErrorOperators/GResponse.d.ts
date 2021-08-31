import { OperationResult } from './OperationResult';
import { StatusObject } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
/**
 * This represents a response in a way formatted for GRPC.
 */
export declare class GResponse<T, E = Partial<StatusObject>> extends OperationResult<T, E> {
    private constructor();
    /**
     * Will build a valid response with an specific type, this should mirror the parents T, value.
     * @param value the response.
     */
    static accept<U>(value: U): GResponse<U>;
    /**
     * Will build a valid response without any content.
     */
    static acceptEmpty(): GResponse<void>;
    /**
     * Will build a failed response with a GRPC error.
     * @param error The error
     */
    static fail<U>(error: StatusObject | Partial<StatusObject>): GResponse<U>;
    /**
     * Fail with a generic error, should be avoided.
     * @param error
     */
    static failAny<U>(error: any): GResponse<U>;
    /**
     * Build a failed response based on a message and a premeditated status.
     * @param error The error message.
     * @param status The status for this error.
     */
    static failWithMessage<U>(error: string, status: Status): GResponse<U>;
}
