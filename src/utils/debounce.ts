/**
 * 防抖函数 在延迟的时间内重复触发，刷新延迟时间，只执行最后一次触发
 * @param fn 需要执行的函数
 * @param delay 间隔时间
 * @returns 
 */
export function debounce(fn:Function, delay:number = 300):any {
    console.log('debounce')
    let timeout:  NodeJS.Timeout | null = null;
    return function (this) {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(()=>{
            fn.apply(this, arguments);
        }, delay);
    };
}

/**
 * 节流函数 一段时间内只执行一次触发
 * @param fn 需要执行的函数
 * @param delay 间隔时间
 * @param immediate 是否立即执行，默认延迟后再执行
 * @returns 
 */
export function throttle(fn, delay = 300,immediate=false) {
    console.log('throttle')
    let timeout:  NodeJS.Timeout | null = null;
    return function (this) {
       if(!timeout){
           immediate &&  fn.apply(this, arguments);
           timeout = setTimeout(() => {
            !immediate &&  fn.apply(this, arguments);
            timeout && clearTimeout(timeout);
            timeout = null;
          }, delay);
       }
    };
}

// function throttle(fn, delay, immediate = true) {
//     let time = null;
//     return function () {
//       if (!time) {
//         //是否立即执行
//         if (immediate) {
//           fn.apply(this, arguments);
//         }
//         time = setTimeout(() => {
//           if (!immediate) {
//             fn.apply(this, arguments);
//           }
//           clearTimeout(time);
//           time = null;
//         }, delay);
//       }
//     };
//   }