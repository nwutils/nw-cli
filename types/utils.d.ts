declare namespace _default {
    export { PLATFORM_KV };
    export { ARCH_KV };
    export { CACHE_DIR };
}
export default _default;
declare namespace PLATFORM_KV {
    let darwin: string;
    let linux: string;
    let win32: string;
}
declare namespace ARCH_KV {
    let x64: string;
    let ia32: string;
    let arm64: string;
}
declare const CACHE_DIR: string;
