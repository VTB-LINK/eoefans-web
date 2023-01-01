import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import VideoPage from "./routers/video";
import "./index.less";
import ReadPage from "./routers/read";
import Layout from "./routers/layout";
import PhotoPage from "./routers/photo";
import ErrorPage from "./routers/error";

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
            path: "video",
            element: <VideoPage />,
          },
          {
            path: "read",
            element: <ReadPage />,
          },
          {
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
  <RouterProvider router={router} />

  // </React.StrictMode>
);
