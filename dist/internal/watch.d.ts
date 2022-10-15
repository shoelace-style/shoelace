import type { LitElement } from 'lit';
declare type UpdateHandler = (prev?: unknown, next?: unknown) => void;
declare type NonUndefined<A> = A extends undefined ? never : A;
declare type UpdateHandlerFunctionKeys<T extends object> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];
interface WatchOptions {
    waitUntilFirstUpdate?: boolean;
}
export declare function watch(propName: string, options?: WatchOptions): <ElemClass extends LitElement>(proto: ElemClass, decoratedFnName: UpdateHandlerFunctionKeys<ElemClass>) => void;
export {};
