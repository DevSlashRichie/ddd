export declare type Optional<T, R extends keyof T> = Omit<T, R> & Partial<Pick<T, R>>;
export declare type LiteralUnion<T extends U, U> = T | (U & {});
