import axios from "axios";
import JSONBigInt from "json-bigint";
/**
 * 类型文件导入
 */
import {
  IFetchVideoParams,
  RFetchPhotoRes,
  RFetchVideoRes,
  IFetchPhotoParams,
} from "./fetchtype";
import { Host_Url } from "./tool";
import { Omit } from "../index";

export const BackEndAxios = axios.create({
  baseURL: Host_Url,
  timeout: 9000,
  transformResponse: [
    (data) => {
      try {
        return JSONBigInt.parse(data);
      } catch (err) {
        return data;
      }
    },
  ],
});
/**
 * 后端接口配置
 */
BackEndAxios.interceptors.request.use((config) => {
  //添加请求凭证
  config.params = {
    ...config.params,
    "subscription-key": "3cc4284fbb864965a7a9ad0f28af8496",
  };
  return config;
});

/**
 * video视频数据获取接口
 */
export async function fetchVideos(
  params: IFetchVideoParams
): Promise<RFetchVideoRes> {
  try {
    const res = await BackEndAxios.get("/video-interface/advanced-search", {
      params: {
        order: params.order || "score",
        page: params.page,
        copyright: params.copyright,
        q: params.q,
        tname: params.tname,
      },
    });
    return res.data;
  } catch (e) {
    // console.log({ e });
    return {
      code: 500,
      message: "网络请求错误，您似乎处于断网状态",
      ttl: 0,
      data: {
        page: 0,
        numResults: 0,
        result: [],
      },
    };
  }
}
/**
 * photo图片数据获取接口
 */
export async function fetchPhotos(
  params: IFetchPhotoParams
): Promise<RFetchPhotoRes> {
  // console.log({ params });
  try {
    const res = await BackEndAxios.get(`/pic/${params.type}`, {
      params: Omit(params, "type"),
    });
    return res.data;
  } catch (e) {
    return {
      code: 500,
      message: "网络请求错误，您似乎处于断网状态",
      ttl: 0,
      data: {
        page: 0,
        total: 0,
        result: [],
      },
    };
  }
}
