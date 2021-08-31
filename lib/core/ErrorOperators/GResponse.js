"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GResponse = void 0;
const OperationResult_1 = require("./OperationResult");
const grpc_js_1 = require("@grpc/grpc-js");
/**
 * This represents a response in a way formatted for GRPC.
 */
class GResponse extends OperationResult_1.OperationResult {
    constructor(value, error) {
        super(error, value);
    }
    /**
     * Will build a valid response with an specific type, this should mirror the parents T, value.
     * @param value the response.
     */
    static accept(value) {
        return new GResponse(value, null);
    }
    /**
     * Will build a valid response without any content.
     */
    static acceptEmpty() {
        return new GResponse(undefined, null);
    }
    /**
     * Will build a failed response with a GRPC error.
     * @param error The error
     */
    static fail(error) {
        return new GResponse(null, error);
    }
    /**
     * Fail with a generic error, should be avoided.
     * @param error
     */
    static failAny(error) {
        return new GResponse(null, error);
    }
    /**
     * Build a failed response based on a message and a premeditated status.
     * @param error The error message.
     * @param status The status for this error.
     */
    static failWithMessage(error, status) {
        const err = new grpc_js_1.StatusBuilder()
            .withCode(status)
            .withDetails(error)
            .build();
        return new GResponse(null, err);
    }
}
exports.GResponse = GResponse;
//# sourceMappingURL=GResponse.js.map