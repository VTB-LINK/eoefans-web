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
  let flag = true;
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
export function concurrencyRequest<T>(
  urls: string[],
  requestFn: (url: string) => Promise<T>,
  maxNum: number = 1
): Promise<T[]> {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    const results: T[] = [];
    let index = 0; // 下一个请求的下标
    let count = 0; // 当前请求完成的数量

    // 发送请求
    async function request() {
      if (index >= urls.length) return;
      const i = index; // 保存序号，使result和urls相对应
      const url = urls[index];
      index++;
      try {
        const resp = await requestFn(url);
        // resp 加入到results
        results[i] = resp;
      } catch (err) {
        // err 加入到results
        results[i] = err as T;
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

/**
 * @description Pick函数，将对象中的某些属性抽离出来返回一个新对象
 */
export function Pick<T extends object, P extends keyof T>(
  originObj: T,
  ...getAttr: P[]
): Pick<T, P> {
  return getAttr.reduce((pre, cur) => {
    pre[cur] = originObj[cur];
    return pre;
  }, Object.create(null));
}

/**
 * @description Omit函数，将对象中的某些属性剔除返回一个新对象
 */
export function Omit<T extends object, P extends keyof T>(
  originObj: T,
  ...noUseAttr: P[]
): Omit<T, P> {
  return noUseAttr.reduce(
    (pre, cur) => {
      delete pre[cur];
      return pre;
    },
    { ...originObj }
  );
}

/**
 * @description 深拷贝对象
 */
export function deepClone(obj: any, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Function) return obj;
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

/**
 * @description 节流函数,指连续触发事件但是在 n 秒中只执行一次函数
 */
export function thorttleFn<T extends (...args: any) => any>(
  fn: T,
  absTime: number = 3000
) {
  let time: number | Date = 0;
  return function (...res: Parameters<T>) {
    let curTime = new Date();
    if (time === 0) {
      //@ts-ignore
      fn.apply(this, res);
      time = curTime;
      //@ts-ignore
    } else if (curTime - time >= absTime) {
      time = curTime;
      //@ts-ignore
      fn.apply(this, res);
    }
  };
}

/**
 * @description 获取当前版本
 */
export const getVersion = () => __APP_VERSION__;
