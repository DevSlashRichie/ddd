import { ClientUnaryCall, ServiceError } from '@grpc/grpc-js';
import { Message as Msg } from 'google-protobuf';
import { GResponse } from 'ddd-scaffold';

type EndpointResponse<R extends Msg> = (error: ServiceError | null, response: R) => void;
type UnaryEndpoint<T extends Msg, R extends Msg> = (request: T, callback: EndpointResponse<R>) => ClientUnaryCall;

export class GUtils {

    public static async completeExtract<T extends Msg, R extends Msg>(request: T, endpoint: UnaryEndpoint<T, R>) {
        return await new Promise<GResponse<{ response: R, call: ClientUnaryCall }>>(accept => {
            const call = endpoint(request, (error, response) => {
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


    public static async extract<T extends Msg, R extends Msg>(request: T, endpoint: UnaryEndpoint<T, R>) : Promise<GResponse<R>> {
        const value = await this.completeExtract(request, endpoint);
        if(!value.isSuccess())
            return GResponse.failAny(value.getError());
        return GResponse.accept(value.getValue().response);
    }

}