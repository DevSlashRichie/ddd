"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUtils = void 0;
const map = {
    3: 400,
    5: 404,
    6: 406,
    7: 403,
    12: 501,
    13: 500,
    16: 403,
};
const reverseMap = Object.entries(map)
    .reduce((currentValue, nextValue) => ({ ...currentValue, [nextValue[0]]: nextValue[1] }), {});
class ErrorUtils {
    static grpcErrorCodeToHttpCode(code) {
        return map[code];
    }
    static httpCodeToGrpcCode(code) {
        return reverseMap[code];
    }
}
exports.ErrorUtils = ErrorUtils;
//# sourceMappingURL=ErrorUtils.js.map