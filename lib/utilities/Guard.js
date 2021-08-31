"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const Result_1 = require("../core/ErrorOperators/Result");
/**
 * Class helper to catch errors at parameters or validation.
 */
class Guard {
    /**
     * Check if the parameter is not undefined.
     * @param parameter The parameter to be analyzed
     * @param parameterName The name of the parameter (Used for the error).
     */
    static preventNullOrUndefined(parameter, parameterName) {
        if (parameter === null || parameter === undefined)
            return Result_1.Result.fail(`${parameterName} is null or undefined.`);
        else
            return Result_1.Result.accept(null);
    }
    /**
     * Same as {@link preventNullOrUndefined} but you can use multiple values at the same method.
     * You'll need to pass an array of arrays that includes the parameter
     * and the name with the following order: [parameter, paramName]
     * @param values
     */
    static preventMultipleNullOrUndefined(values) {
        for (let value of values) {
            const [parameter, parameterName] = value;
            if (parameter === null || parameter === undefined)
                return Result_1.Result.fail(`${parameterName} is null or undefined.`);
        }
        return Result_1.Result.accept(null);
    }
    /**
     * Used to append an error at a URL.
     * Used just for OAuth2
     * @param url The url
     * @param message The message for the error
     */
    static appendErrorMessage(url, message) {
        const match = url.match(/(error=)(\w*)/);
        if (!match || match.length === 0)
            return url + "&error=" + message;
        return url.replace(/(error=)(\w*)/, "$1" + message);
    }
}
exports.Guard = Guard;
//# sourceMappingURL=Guard.js.map