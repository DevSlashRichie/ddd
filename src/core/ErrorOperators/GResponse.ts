import { OperationResult } from './OperationResult';
import { StatusBuilder, StatusObject } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

/**
 * This represents a response in a way formatted for GRPC.
 */
export class GResponse<T, E = Partial<StatusObject>> extends OperationResult<T, E> {

  private constructor(value: T | null, error: E | null) {
    super(error, value);
  }

  /**
   * Will build a valid response with an specific type, this should mirror the parents T, value.
   * @param value the response.
   */
  public static accept<U>(value: U): GResponse<U> {
    return new GResponse<U>(value, null);
  }

  /**
   * Will build a valid response without any content.
   */
  public static acceptEmpty(): GResponse<void> {
    return new GResponse<void>(undefined, null);
  }

  /**
   * Will build a failed response with a GRPC error.
   * @param error The error
   */
  public static fail<U>(error: StatusObject | Partial<StatusObject>): GResponse<U> {
    return new GResponse<U>(null, error);
  }

  /**
   * Fail with a generic error, should be avoided.
   * @param error
   */
  public static failAny<U>(error: any): GResponse<U> {
    return new GResponse<U>(null, error);
  }

  /**
   * Build a failed response based on a message and a premeditated status.
   * @param error The error message.
   * @param status The status for this error.
   */
  public static failWithMessage<U>(error: string, status: Status): GResponse<U> {
    const err = new StatusBuilder()
    .withCode(status)
    .withDetails(error)
    .build();

    return new GResponse<U>(null, err);
  }

}