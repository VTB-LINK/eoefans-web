/**
 *@description  video接口的请求参数类型
 */
export interface IFetchVideoParams {
  /**
   * @description 排序方式，三种可选值pubdate、view、score，即数据库列名。
   * pubdate为最新发布排序，view为最多播放排序，score为最高得分排序
   * @example pubdate | view | score
   */
  order: "pubdate" | "view" | "score";
  /**
   * @description 分页，每页返回20个；从1开始，自然数递增
   * @example 1
   */
  page: number;
  /**
   * @description q高级搜索语句，详细看API文档 @access {https://portal.api.eoe.best/api-details_get-video}
   * @example tag.乃琳+手绘.OR~name.贾布加布~pubdate.1619416601+1649416601.BETWEEN
   */
  q?: string;
  /**
   * @description 1表示为原创视频，2表示为转载视频
   * @example 1 |2
   */
  copyright?: 1 | 2;
  /**
   * @description animation表示数据库中tid为1, 24, 25, 47, 210, 86, 27的视频；
   * music表示tid为3, 28, 31, 30, 194, 59, 193, 29, 130的视频；
   * dance表示tid为20, 198, 199, 200, 154, 156的视频；
   * game表示tid为4, 17, 171, 172, 65, 173, 121, 136, 19的视频；
   * live表示tid为160, 138, 239, 161, 162, 21的视频；
   * delicacy表示tid为211, 76, 212, 213, 214, 215的视频；
   * guichu表示tid为119, 22, 26, 126, 216, 127的视频；
   * others表示tid为其他的视频
   * @example animation | music | dance |
   * game | live | delicacy | guichu | other
   */
  tname?:
    | "animation"
    | "music"
    | "dance"
    | "game"
    | "live"
    | "delicacy"
    | "guichu"
    | "other";
}

interface RFetchVideoResResult {
  /**
   * @description 视频的bv号
   * @example "BV1dY41127BZ"
   */
  bvid: string;
  /**
   * @description 视频AVID
   */
  aid: number;
  /**
   * @description 视频作者名字
   * @example "米诺高分少女"
   */
  name: string;
  /**
   * @description 视频作者UID
   */
  mid: number;
  /**
   * @description 视频作者头像url
   * @example "https://i2.hdslb.com/bfs/face/3da6145e81745cabd1f79b9c61772f884e783b7e.jpg"
   */
  face: string;
  /**
   * @description 视频分区ID
   */
  tid: number;
  /**
   * @description 视频分区名字
   * @description "翻唱"
   */
  tname: string;
  /**
   * @description 1表示为原创视频，2表示为转载视频
   * @example 1
   */
  copyright: number;
  /**
   * @description 视频标题
   * @example "米诺米诺米诺米诺米诺米诺米诺米诺米诺"
   */
  title: string;
  /**
   * @description 视频描述
   * @example "原曲：周杰伦\n翻唱：米诺\n钢琴：柚恩\n-----------------------\n
   * 莞儿@莞儿睡不醒 ：https://space.bilibili.com/1875044092\n露早@露早GOGO ：
   * https://space.bilibili.com/1669777785\n米诺@米诺高分少女 ：
   * https://space.bilibili.com/1778026586\n虞莫@虞莫MOMO ：
   * https://space.bilibili.com/1811071010\n柚恩@柚恩不加糖 ：
   * https://space.bilibili.com/1795147802\n官号﻿@EOE组合 ：
   * https://space.bilibili.com/2018113152"
   */
  desc: string;
  /**
   * @description 视频封面url
   * @example "http://i1.hdslb.com/bfs/archive/cec5a75c1321f81d960020a7a3e17c3f89b8dc78.jpg"
   */
  pic: string;
  /**
   * @description 视频tag
   * @example "钢琴,周杰伦,弹唱,EOE,不能说的秘密,4K,米诺,华语现场,让虚拟歌手为你唱,柚恩,2023虚拟歌手贺岁纪"
   */
  tag: string;
  /**
   * @description 视频上传时间
   */
  pubdate: number;
  /**
   * @description 应该是时长
   */
  duration: string;
  /**
   * @description 视频观看次数
   * @example  3876
   */
  view: number;
  /**
   * @description 应该是弹幕数量
   *
   */
  danmaku: number;
  /**
   * @description 视频评论条数
   */
  reply: number;
  /**
   * @description 收藏数量
   */
  favorite: number;
  /**
   * @description 视频硬币数
   */
  coin: number;
  /**
   * @description 视频分享数
   */
  share: number;
  /**
   * @description 视频点赞数
   */
  like: number;
  score: number;
  status: number;
  created_at: number;
  updated_at: number;
}

interface RFetchVideoResData {
  /**
   * @example 1
   */
  page: number;
  /**
   * @example 6699
   */
  numResults: number;
  result: RFetchVideoResResult[];
}
/**
 * @description video接口的返回类型
 */
export interface RFetchVideoRes {
  /**
   * @example 0
   */
  code: 0 | 400 | 500;
  /**
   * @example "ok"
   */
  message: string;
  /**
   * @example 1
   */
  ttl: number;
  /**
   * @description 放数据的
   */
  data: RFetchVideoResData;
}
