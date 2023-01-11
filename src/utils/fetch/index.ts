import videoJson from "./video.json";

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
  console.log({ params });
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(videoJson);
  //   }, 1000);
  // });
  return fetch(
    `/v1/video-interface/advanced-search?order=${params.order}&page=${
      params.page
    }&copyright=${params.copyright || 1}&q=${params.q || ""}${
      params.tname && `&tname=${params.tname}`
    }`,
    {
      method: "GET",
      headers: {
        "ocp-Apim-Subscription-Key": "3cc4284fbb864965a7a9ad0f28af8496",
        origin: "https://portal.api.eoe.best",
      },
    }
  ).then((response) => response.json() as Promise<RFetchVideoRes>);
}
