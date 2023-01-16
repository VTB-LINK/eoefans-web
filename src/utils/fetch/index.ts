/**
 * 类型文件导入
 */
import { IFetchVideoParams, RFetchVideoRes } from "./fetchtype";

/**
 * video视频数据获取接口
 */
export function fetchVideos(
  params: IFetchVideoParams
): Promise<RFetchVideoRes> {
  const fetchUrl = `/v1/video-interface/advanced-search?order=${
    params.order || "view"
  }&page=${params.page}${
    params.copyright ? `&copyright=${params.copyright}` : ""
  }
  ${params.q ? `&q=${params.q}` : ""}
  ${params.tname ? `&tname=${params.tname}` : ""}`
    .replace(/\s+/g, "")
    .trim();
  return fetch(fetchUrl, {
    method: "GET",
    headers: {
      "ocp-Apim-Subscription-Key": "3cc4284fbb864965a7a9ad0f28af8496",
      origin: "https://portal.api.eoe.best",
    },
  }).then((response) => response.json() as Promise<RFetchVideoRes>);
}
