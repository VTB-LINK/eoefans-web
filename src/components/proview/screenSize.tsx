import { Breakpoint } from "@mui/material";
import { useScreenMatchSize } from "@utils/hooks/match";
import { ReactChildrenType } from "./type";
import { useContext, createContext } from "react";
const size_list: Breakpoint[] = ["lg", "md", "sm", "xs"];

const ScreenContext = createContext<ScreenContextType>(
  size_list.reduce((pre, size: Breakpoint) => {
    //@ts-ignore
    pre[size] = false;
    return pre;
  }, {} as ScreenContextType)
);
type ScreenContextType = {
  lg: boolean;
  md: boolean;
  sm: boolean;
  xs: boolean;
};

const ScreenProview = ({ children }: ReactChildrenType) => {
  const ScreenSize: ScreenContextType = size_list.reduce((preObj, size) => {
    //@ts-ignore
    preObj[size] = useScreenMatchSize(size);
    return preObj;
  }, {} as ScreenContextType);
  return (
    <ScreenContext.Provider value={ScreenSize}>
      {children}
    </ScreenContext.Provider>
  );
};
export const useScreenSize = () => {
  return useContext(ScreenContext);
};

export default ScreenProview;
