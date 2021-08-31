"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const OperationResult_1 = require("./OperationResult");
/**
 * Represents a waited error but in a more generic way because it returns a string error.
 */
class Result extends OperationResult_1.OperationResult {
    constructor(value, error) {
        super(error, value);
    }
    /**
     * Build the error message as an {@link Error}
     */
    returnAsError() {
        return new Error(this.getError());
    }
    /**
     * Throw the message as an {@link Error}
     */
    assert() {
        if (this.getError()) {
            throw new Error(this.getError());
        }
    }
    /**
     * Build a valid response with a value.
     * @param value The response object.
     */
    static accept(value) {
        return new Result(value, null);
    }
    /**
     * Fail the response with a message.
     * @param error The message
     */
    static fail(error) {
        return new Result(null, error);
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map