import {ClientUnaryCall, ServiceError} from '@grpc/grpc-js';
import {Message as Msg} from 'google-protobuf';
import {GResponse} from 'ddd-scaffold';

type EndpointResponse<R extends Msg> = (error: ServiceError | null, response: R) => void;
type EndpointCall<R extends Msg> = (res: EndpointResponse<R>) => ClientUnaryCall;

export class GUtils {

    public static async completeExtract<R extends Msg>(endpoint: EndpointCall<R>): Promise<GResponse<{ response: R, call: ClientUnaryCall }>> {
        return await new Promise<GResponse<{ response: R, call: ClientUnaryCall }>>(accept => {
            const call = endpoint((error, response) => {
                if (error)
                    accept(GResponse.failAny(error));
                else
                    accept(GResponse.accept({
                        response,
                        call
                    }));
            });
        });
    }


    public static async extract<R extends Msg>(endpoint: EndpointCall<R>): Promise<GResponse<R>> {
        const value = await this.completeExtract(endpoint);
        if (!value.isSuccess())
            return GResponse.failAny(value.getError());
        return GResponse.accept(value.getValue().response);
    }

}

export class GBuilder {

    private readonly recovers: Array<EndpointCall<any>>;

    private constructor() {
        this.recovers = [];
    }

    public async execute<R extends Msg, T extends Msg>(origin: EndpointCall<R>, recover?: EndpointCall<T>, autoRecover = true) {
        if(recover)
            this.recovers.push(recover);

        const op = await GUtils.extract<R>(origin);

        if (!op.isSuccess() && autoRecover)
            await this.recover(!recover);

        return op;
    }

    public async chain<A extends Msg, B extends Msg>(origin: EndpointCall<A>) {
        const op = await GUtils.extract(origin);
        if (!op.isSuccess())
            await this.recover();

        return {
            origin: op,
            recover: (func: (res: A) => EndpointCall<B>) => {
                if (op.isSuccess())
                    this.recovers.push(func(op.getValue()));
                return op;
            }
        }
    }

    public async recover(includeLast = false) {
        const recoveries = includeLast ? this.recovers : this.recovers.slice(0, this.recovers.length - 1);
        recoveries.forEach(pair => {
            pair(() => {});
        });
        return this;
    }

    public static create() {
        return new GBuilder();
    }

}