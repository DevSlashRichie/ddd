import {StatusObject} from "@grpc/grpc-js";

export class DError extends Error {

    /**
     * This can be either grpc or http error code.
     */
    public readonly networkError;

    public readonly internalCode;

    constructor(message = 'Message not provided', httpCode = 500, internalCode = 0) {
        super(message);

        this.networkError = httpCode;
        this.internalCode = internalCode;
    }

    public static buildFromGRPC(error: StatusObject | Partial<StatusObject>) {
        let _internalCode = error.metadata?.get('internalCode');

        let internalCode: number = 0;
        if (_internalCode && _internalCode.length > 0) {
            const buff = _internalCode[0];
            if (!Number.isNaN(buff))
                internalCode = Number(buff);
        }

       return new DError(error.details, error.code, internalCode);
    }

    public static isDError(err: Error) {
        return err instanceof DError;
    }

    public static isErrorCanBeDError(err: StatusObject | Partial<StatusObject>) {
        return err && err.metadata && err.metadata.get('internalCode');
    }

}
