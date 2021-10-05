

const map = {
    3: 400,
    5: 404,
    6: 406,
    7: 403,
    12: 501,
    13: 500,
    16: 403,
} as Record<number, number>;

const reverseMap = Object.entries(map)
    .reduce((currentValue, nextValue) =>
        ({ ...currentValue, [nextValue[0]]: nextValue[1] }),
        {} as Record<number, number>);

export class ErrorUtils {

    public static grpcErrorCodeToHttpCode(code: number) {
        return map[code];
    }

    public static httpCodeToGrpcCode(code: number) {
        return reverseMap[code];
    }

}