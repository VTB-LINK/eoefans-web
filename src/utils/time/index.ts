import dayJs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayJs.locale("zh-cn");
dayJs.extend(realtiveTime);

export default function getrealtiveTime(time: number): string {
  return dayJs(time).toNow();
}
