export type Optional<T, R extends keyof T> = Omit<T, R> & Partial<Pick<T, R>>;
export type LiteralUnion<T extends U, U> = T | (U & {});
