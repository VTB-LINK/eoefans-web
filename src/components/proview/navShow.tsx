import { createContext, useContext, useState } from "react";
import { Flipper } from "react-flip-toolkit";
import { ReactChildrenType } from "./type";

const NavContext = createContext({
  showed: false,
  handlerChangeShow: () => {},
});
const NavShowProview = ({ children }: ReactChildrenType) => {
  const [showed, set] = useState(false),
    handlerChangeShow = () => set((showed) => !showed);
  return (
    <NavContext.Provider value={{ showed, handlerChangeShow }}>
      <Flipper flipKey={showed} decisionData={showed} spring={"veryGentle"}>
        {children}
      </Flipper>
    </NavContext.Provider>
  );
};

export const useNavShowed = () => useContext(NavContext);

export default NavShowProview;
