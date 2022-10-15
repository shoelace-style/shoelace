declare type IconFile = {
    ok: true;
    status: number;
    svg: string;
} | {
    ok: false;
    status: number;
    svg: null;
};
export declare function requestIcon(url: string): Promise<IconFile>;
export {};
