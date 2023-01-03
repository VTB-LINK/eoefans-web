export function Once<T extends (...args: any) => any>(fn: T) {
  let tag: Function | null = fn;
  return function (...res: Parameters<T>) {
    if (tag instanceof Function) {
      //@ts-ignore
      tag.apply(this, res);
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
/**
 * @description 网络请求并发限制函数,默认返回结果队列，如果提供successStatus或者errorStatus则替换resolve和reject结果
 */
export function concurrencyRequest(
  urls: string[],
  maxNum: number = 1,
  successStatus?: unknown,
  errorStatus?: unknown
): Promise<unknown[]> {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results: unknown[] = [];
    let index = 0; // 下一个请求的下标
    let count = 0; // 当前请求完成的数量

    // 发送请求
    async function request() {
      if (index >= urls.length) return;
      const i = index; // 保存序号，使result和urls相对应
      const url = urls[index];
      index++;
      try {
        const resp = await fetch(url);
        // resp 加入到results
        results[i] = successStatus || resp;
      } catch (err) {
        // err 加入到results
        results[i] = errorStatus || err;
      } finally {
        count++;
        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }

    // maxNum和urls.length取最小进行调用
    const times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
