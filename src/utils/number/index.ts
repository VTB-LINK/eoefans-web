/**
 * @description 给大数字进行缩减，如10000-》1.0w
 */
export default function getFixedNumber(number: number): number | string {
  if (number > 10000) {
    return (number / 10000).toFixed(1) + "w";
  }
  return number;
}
