import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "./routers/video";
import "./index.less";
import ReadPage from "./routers/read";
import Layout from "./routers/layout";
import PhotoPage from "./routers/photo";
import ErrorPage from "./routers/error";
import ScreenProview from "@components/proview/screenSize";
// const ReadPage = lazy(() => import("./routers/read")),
//   Layout = lazy(() => import("./routers/layout")),
//   PhotoPage = lazy(() => import("./routers/photo")),
//   ErrorPage = lazy(() => import("./routers/error"));

//ployfill
import "intersection-observer";
import "./normalize.css";
import "loading-attribute-polyfill";
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
            element: <PhotoPage />,
          },
          {
            // video瀑布流展示页面
            path: "video",
            element: <VideoPage />,
          },
          {
            // 二创文章瀑布流展示页面
            path: "read",
            element: <ReadPage />,
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
  // <React.StrictMode>
  // <Suspense>
  <ScreenProview>
    <RouterProvider router={router} />
  </ScreenProview>
  // </Suspense>

  // </React.StrictMode>
);
