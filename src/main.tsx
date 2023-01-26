import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//router page
import VideoPage from "./routers/video";
import Layout from "./routers/layout";
import PhotoPage from "./routers/photo";
import ErrorPage from "./routers/error";
//preview
import ScreenProview from "@components/proview/screenSize";
import MUIThemePreview from "@components/proview/themePreview";
import SearchFocuspreview from "@components/proview/searchFocus";
import { Provider } from "react-redux";
import store from "@store/index";
//ployfill
import "intersection-observer";
import "./normalize.css";
import "loading-attribute-polyfill";
import "./index.less";
import "swiper/css/bundle";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader:
    // action:
    // error组件
    errorElement: <ErrorPage />,
    children: [
      {
        // error组件
        errorElement: <ErrorPage />,
        children: [
          {
            //默认页面
            index: true,
            element: <VideoPage />,
          },
          {
            // video瀑布流展示页面
            path: "video",
            element: <VideoPage />,
          },
          {
            // 二创图片瀑布流展示页面
            path: "photo",
            element: <PhotoPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ScreenProview>
    <MUIThemePreview>
      <SearchFocuspreview>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </SearchFocuspreview>
    </MUIThemePreview>
  </ScreenProview>
);
