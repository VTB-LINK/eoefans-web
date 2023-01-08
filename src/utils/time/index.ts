import dayJs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/zh-cn";
dayJs.locale("zh-cn");
dayJs.extend(realtiveTime);
dayJs.extend(duration);
//todo 修改时间显示，1天前这种要改成具体的时间
export default function getrealtiveTime(time: number): string {
  return dayJs(time).fromNow();
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
