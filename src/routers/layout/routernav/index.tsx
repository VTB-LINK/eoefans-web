import { Tab, Tabs } from "@mui/material";
import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScreenSize } from "@components/proview/screenSize";
import MenuRouter from "./menu";

export const RouterList: TabProps[] = [
  {
    label: "视频",
    to: "/video",
  },
  {
    label: "图片",
    to: "/photo",
  },
];

export default function RouterNav() {
  const { pathname } = useLocation(),
    handler = () => (pathname === "/photo" ? 1 : 0);
  const [value, set] = useState(handler),
    changehandler = useCallback(() => set(handler), [handler]);
  useEffect(() => {
    changehandler();
  }, [pathname]);
  const { sm } = useScreenSize();
  return (
    <>
      {sm ? (
        <MenuRouter />
      ) : (
        <Tabs value={value}>
          {RouterList.map((item, index) => (
            <TabLink {...item} key={index} />
          ))}
        </Tabs>
      )}
    </>
  );
}
export type TabProps = {
  label: string;
  to: string;
};
export function TabLink(props: TabProps) {
  const { pathname } = useLocation();
  return (
    <Tab
      component={Link}
      {...props}
      sx={{
        color: pathname === props.to ? "primary.main" : "text.main",
        opacity: 1,
        padding: {
          md: "12px 16px",
          sm: "0px",
        },
      }}
    />
  );
}
