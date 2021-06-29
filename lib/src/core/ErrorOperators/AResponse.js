"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AResponse = void 0;
const OperationResult_1 = require("./OperationResult");
/**
 * Represents a generic error, nearly to what a normal error is but in a expected way.
 */
class AResponse extends OperationResult_1.OperationResult {
    constructor(value, error) {
        super(error, value);
    }
    /**
     * Build a valid response with a value.
     * @param value The response
     */
    static accept(value) {
        return new AResponse(value, null);
    }
    /**
     * Build a valid response without content.
     */
    static acceptEmpty() {
        return new AResponse(undefined, null);
    }
    /**
     * Fail a response with an {@link Error}
     * @param error
     */
    static fail(error) {
        return new AResponse(null, error);
    }
    /**
     * Build a response with an error as any type.
     * @param error The error obj.
     */
    static failAny(error) {
        return new AResponse(null, error);
    }
    /**
     * Build an failed response with a message encapsulated in an {@link Error}
     * @param error
     */
    static failWithMessage(error) {
        return new AResponse(null, new Error(error));
    }
}
exports.AResponse = AResponse;
//# sourceMappingURL=AResponse.js.map