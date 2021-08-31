"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
/**
 * This represents a controller value.
 * For example: an email, a value Object needs to have a factory method that first, checks a valid email syntax.
 */
class ValueObject {
    constructor(props) {
        this.props = props;
    }
    get raw() {
        return this.props;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=ValueObject.js.map