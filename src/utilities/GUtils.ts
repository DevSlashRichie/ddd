import { ClientUnaryCall, ServiceError } from '@grpc/grpc-js';
import { Message as Msg } from 'google-protobuf';
import { GResponse } from '..';

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

    private readonly autoRecover: boolean;
    private readonly recovers: Array<() => Promise<void> | PromiseLike<void> | void>;

    protected constructor(autoRecover: boolean) {
        this.recovers = [];
        this.autoRecover = autoRecover;
    }

    public async execute<R extends Msg, T extends Msg = never>(origin: EndpointCall<R>, recover?: EndpointCall<T>) {
        if(recover)
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.recovers.push(async () => {
                await recover(() => {}); 
            });

        const op = await GUtils.extract<R>(origin);

        if (!op.isSuccess() && this.autoRecover)
            await this.recover(!recover);

        return op;
    }

    public async chain<A extends Msg, B extends Msg = never>(origin: EndpointCall<A>) {
        const op = await GUtils.extract(origin);
        if (!op.isSuccess())
            await this.recover();

        return {
            origin: op,
            recover: (func: (origin: A, res: EndpointResponse<B>) => ClientUnaryCall) => {
                if (op.isSuccess()) {
                    this.recovers.push(async () => {
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        await func(op.getValue(), () => {});
                    });
                }
                return op;
            },
        };
    }

    public addPlainRecover(recover: () => Promise<void> | PromiseLike<void> | void) {
        this.recovers.push(recover);
        return this;
    }

    public async recover(includeLast = false) {
        const recoveries = includeLast ? this.recovers : this.recovers.slice(0, this.recovers.length - 1);
        for await (const func of recoveries) {
            await func();
        }
        return this;
    }

    public static create(autoRecover = true) {
        return new GBuilder(autoRecover);
    }

}