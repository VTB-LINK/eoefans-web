import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

/**
 * @description 获知当前屏幕处于哪种大小
 */
export const useScreenMatchSize = (size: Breakpoint) => {
  const theme = useTheme();
  const matchSize = useMediaQuery(theme.breakpoints.down(size));
  return matchSize;
};
//个人主页头像大小
`@240w_240h_1c_1s.webp`;
//移动平台首页图片大小
`@480w_270h_1c`;
//电脑平台首页图片大小
`@672w_378h_1c_!web-search-common-cover`;
//首页up头像大小
`@96w_96h_1s.webp`;
