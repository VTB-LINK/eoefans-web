/**
 * @description Image组件参数
 */
export type ImageProps = {
  /**
   * @description 图片的url
   * @example "www.example.com/1.jpg"
   */
  url: string;
  /**
   * @description 图片失效的兜底图片url
   * @example "www.example.com/fallback.jpg"
   * 建议提供base64版本
   */
  fallbackUrl?: string;
  /**
   * @description 图片默认宽度，因为自适应的原因最终效果可能大于该宽度
   * @default 200
   * @example 200
   */
  width?: number;
  /**
   * @description 图片高度，注意这个参数只有在已经知道该url对应的图片大小后提供；
   * 提供width和该参数后组件依然进行url的请求但不会使用获取的高度和宽度。
   * 注意：组件内将直接使用该参数值！！！
   */
  height?: number;
  /**
   * @description 是否选择监听该组件，设计出来就是为了在出现该图片之后进行网络请求
   * @example true
   */
  observer?: boolean;
  /**
   * @description 在observer为true时，该组件在可视区时执行callback，默认只执行一次。
   */
  callback?: (inView: boolean) => void;
};
