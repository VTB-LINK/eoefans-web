/**
 * TODO:使用真实数据
 */
import videoJson from "./video.json";

/**
 * 类型文件导入
 */
import { IFetchVideoParams, RFetchVideoRes } from "./fetchtype";

/**
 * video视频数据获取接口
 */
export function fetchVideos(params: IFetchVideoParams): RFetchVideoRes {
  return videoJson;
}
