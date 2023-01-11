import dayJs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import "dayjs/locale/zh-cn";
dayJs.locale("zh-cn");
dayJs.extend(realtiveTime);
dayJs.extend(isToday);
dayJs.extend(isYesterday);
dayJs.extend(duration);
export default function getrealtiveTime(time: number): string {
  const format_time = dayJs(time);
  if (format_time.isToday()) {
    return format_time.fromNow();
  } else if (format_time.isYesterday()) {
    return "昨天";
  }
  return format_time.format("M-D");
}

export function getVideoTime(time: string): string {
  const noFormatTime = dayJs
    .duration(parseInt(time) * 1000)
    .format("DD:HH:mm:ss");
  return noFormatTime
    .split(":")
    .reduceRight((pre, cur) =>
      cur === "00" ? (pre.length < 3 ? `${cur}:${pre}` : pre) : `${cur}:${pre}`
    );
}
