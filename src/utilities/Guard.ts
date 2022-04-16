import { Result } from '../core/ErrorOperators/Result';

/**
 * Class helper to catch errors at parameters or validation.
 */
export class Guard {

    /**
     * Check if the parameter is not undefined.
     * @param parameter The parameter to be analyzed
     * @param parameterName The name of the parameter (Used for the error).
     */
    public static preventNullOrUndefined(parameter: any, parameterName: string): Result<void> {
        if (parameter === null || parameter === undefined)
            return Result.fail(`${parameterName} is null or undefined.`);
        else return Result.accept(null);
    }

    /**
     * Same as {@link preventNullOrUndefined} but you can use multiple values at the same method.
     * You'll need to pass an array of arrays that includes the parameter
     * and the name with the following order: [parameter, paramName]
     * @param values
     */
    public static preventMultipleNullOrUndefined(values: Array<Array<any | string>>): Result<void> {

        for (const value of values) {
            const [ parameter, parameterName ] = value;
            if (parameter === null || parameter === undefined)
                return Result.fail(`${parameterName} is null or undefined.`);
        }

        return Result.accept(null);
    }

    /**
     * Same as {@link preventMultipleNullOrUndefined} but is applied to a whole object.
     * You'll need to pass a complete object.
     * @param object
     */
    public static preventNullOrUndefinedFromObject(object: Record<any, any>): Result<void> {
        const fields = Object.entries(object);
        return this.preventMultipleNullOrUndefined(fields);
    }

    /**
     * Used to append an error at a URL.
     * Used just for OAuth2
     * @param url The url
     * @param message The message for the error
     */
    public static appendErrorMessage(url: string, message: string) {
        const match = url.match(/(error=)(\w*)/);
        if (!match || match.length === 0)
            return url + '&error=' + message;
        return url.replace(/(error=)(\w*)/, '$1' + message);
    }

}