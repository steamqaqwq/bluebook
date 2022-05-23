/**
 * 防抖函数
 * @param fn 需要执行的函数
 * @param time 间隔时间
 * @returns 
 */
export function debounce(fn:any, time = 300):any {
    let timeout: number | null = null;
    return function () {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(fn, time) as any;
    };
}

/**
 * 节流函数
 * @param fn 需要执行的函数
 * @param time 间隔时间
 * @returns 
 */
export function throttle(fn: () => void, time = 300) {
    let canRun: boolean = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
        fn()
        canRun = true;
        }, time);
    };
}