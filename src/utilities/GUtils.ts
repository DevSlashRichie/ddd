import { ClientUnaryCall, ServiceError } from '@grpc/grpc-js';
import { Message as Msg } from 'google-protobuf';
import { GResponse } from 'ddd-scaffold';

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


    public static async extract<R extends Msg>(endpoint: EndpointCall<R>) : Promise<GResponse<R>> {
        const value = await this.completeExtract(endpoint);
        if(!value.isSuccess())
            return GResponse.failAny(value.getError());
        return GResponse.accept(value.getValue().response);
    }

}