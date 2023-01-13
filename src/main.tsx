import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "./routers/video";
import "./index.less";
import Layout from "./routers/layout";
import PhotoPage from "./routers/photo";
import ErrorPage from "./routers/error";
import ScreenProview from "@components/proview/screenSize";
import TagSelectProview from "@components/proview/tagSelect";

//ployfill
import "intersection-observer";
import "./normalize.css";
import "loading-attribute-polyfill";
import "whatwg-fetch";
import NavShowProview from "@components/proview/navShow";
import MUIThemePreview from "@components/proview/themePreview";
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
    <TagSelectProview>
      <NavShowProview>
        <MUIThemePreview>
          <RouterProvider router={router} />
        </MUIThemePreview>
      </NavShowProview>
    </TagSelectProview>
  </ScreenProview>
);
