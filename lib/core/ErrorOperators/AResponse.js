"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AResponse = void 0;
const OperationResult_1 = require("./OperationResult");
/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
class AResponse extends OperationResult_1.OperationResult {
    constructor(value, error, code = 500) {
        super(error, value);
        this.code = code;
    }
    /**
     * Returns the designed error code for this error handler.
     */
    getErrorCode() {
        return this.code;
    }
    /**
     * Build a valid response with a value.
     * @param value The response
     * @param code HTTP Response code
     */
    static accept(value, code) {
        return new AResponse(value, null, code);
    }
    /**
     * Build a valid response without content.
     */
    static acceptEmpty(code) {
        return new AResponse(undefined, null, code);
    }
    /**
     * Fail a response with an {@link Error}
     * @param error
     * @param code
     */
    static fail(error, code) {
        return new AResponse(null, error);
    }
    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     * @param code HTTP Response code
     */
    static failAny(error, code) {
        return new AResponse(null, error, code);
    }
    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     * @param code HTTP Response Code
     */
    static failWithMessage(error, code) {
        return new AResponse(null, new Error(error), code);
    }
}
exports.AResponse = AResponse;
//# sourceMappingURL=AResponse.js.map