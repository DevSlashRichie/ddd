import { StatusObject } from "@grpc/grpc-js";
export declare class DError extends Error {
    /**
     * This can be either grpc or http error code.
     */
    readonly networkError: number;
    readonly internalCode: number;
    constructor(message?: string, internalCode?: number, httpCode?: number);
    static buildFromGRPC(error: StatusObject | Partial<StatusObject>): DError;
    static isDError(err: Error): boolean;
    static isErrorCanBeDError(err: StatusObject | Partial<StatusObject>): import("@grpc/grpc-js").MetadataValue[] | undefined;
    static fromError(error: Error, internalError?: number, networkError?: number): Error;
}
