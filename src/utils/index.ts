export function Once(fn: Function) {
  let tag: Function | null = fn;
  return function () {
    if (tag) {
      //@ts-ignore
      tag.apply(this, arguments);
      tag = null;
    }
  };
}

/**
 * 重复触发请求，在第一个完成之前忽略其他fn。
 */
export function SingleRun<T extends (...args: any) => any>(handler: T) {
  let flag = true,
    times = 0;
  return function (...res: Parameters<T>) {
    return new Promise((resolve, reject) => {
      if (flag) {
        flag = false;
        //@ts-ignore
        resolve(handler.call(this, ...res));
      } else {
        reject("fetching!");
      }
    }).then(
      (res) => {
        flag = true;
        return Promise.resolve(res);
      },
      (reason) => {
        // none
        return Promise.resolve();
      }
    );
  };
}
