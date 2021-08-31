import { Result } from "../core/ErrorOperators/Result";
/**
 * Class helper to catch errors at parameters or validation.
 */
export declare class Guard {
    /**
     * Check if the parameter is not undefined.
     * @param parameter The parameter to be analyzed
     * @param parameterName The name of the parameter (Used for the error).
     */
    static preventNullOrUndefined(parameter: any, parameterName: string): Result<void>;
    /**
     * Same as {@link preventNullOrUndefined} but you can use multiple values at the same method.
     * You'll need to pass an array of arrays that includes the parameter
     * and the name with the following order: [parameter, paramName]
     * @param values
     */
    static preventMultipleNullOrUndefined(values: Array<Array<any | string>>): Result<void>;
    /**
     * Used to append an error at a URL.
     * Used just for OAuth2
     * @param url The url
     * @param message The message for the error
     */
    static appendErrorMessage(url: string, message: string): string;
}
