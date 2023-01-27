import type { LoadingState } from "@store/loading";
type RouterConfig = {
  [router: string]: keyof LoadingState;
};
const RouterMap: RouterConfig = {
  default: "videoIsLoading",
  "/photo": "photoIsloading",
  "/video": "videoIsLoading",
};
export const routerNameToLoading = (pathname: string) =>
  RouterMap[pathname] || RouterMap["default"];
