interface IncludeFile {
    ok: boolean;
    status: number;
    html: string;
}
export declare function requestInclude(src: string, mode?: 'cors' | 'no-cors' | 'same-origin'): Promise<IncludeFile>;
export {};
