/**
 * 类型文件导入
 */
import { IFetchVideoParams, RFetchVideoRes } from "./fetchtype";
import { Host_Url } from "./tool";

/**
 * video视频数据获取接口
 */
export function fetchVideos(
  params: IFetchVideoParams
): Promise<RFetchVideoRes> {
  const fetchUrl = `${Host_Url}/v1/video-interface/advanced-search?order=${
    params.order || "score"
  }&page=${params.page}${
    params.copyright ? `&copyright=${params.copyright}` : ""
  }
  ${params.q ? `&q=${params.q}` : ""}
  ${
    params.tname ? `&tname=${params.tname}` : ""
  }&subscription-key=3cc4284fbb864965a7a9ad0f28af8496`
    .replace(/\s+/g, "")
    .trim();
  return fetch(fetchUrl, {
    method: "GET",
  }).then((response) => response.json() as Promise<RFetchVideoRes>);
}
