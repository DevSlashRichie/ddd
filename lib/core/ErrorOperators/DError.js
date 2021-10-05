"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DError = void 0;
class DError extends Error {
    constructor(message = 'Message not provided', httpCode = 500, internalCode = 0) {
        super(message);
        this.networkError = httpCode;
        this.internalCode = internalCode;
    }
    static buildFromGRPC(error) {
        let _internalCode = error.metadata?.get('internalCode');
        let internalCode = 0;
        if (_internalCode && _internalCode.length > 0) {
            const buff = _internalCode[0];
            if (!Number.isNaN(buff))
                internalCode = Number(buff);
        }
        return new DError(error.details, error.code, internalCode);
    }
    static isDError(err) {
        return err instanceof DError;
    }
    static isErrorCanBeDError(err) {
        return err && err.metadata && err.metadata.get('internalCode');
    }
}
exports.DError = DError;
//# sourceMappingURL=DError.js.map