import { useState, useContext, createContext } from "react";
import { ReactChildrenType } from "./type";

type SearchcontextType = {
  focused: boolean;
  bind: {
    onFocus: () => void;
    onBlur: () => void;
  };
};

const SearchFocusContext = createContext<SearchcontextType>({
  focused: false,
  bind: {
    onFocus() {},
    onBlur() {},
  },
});

const SearchFocuspreview = ({ children }: ReactChildrenType) => {
  const [focused, set] = useState<boolean>(false),
    onFocus = () => set(true),
    onBlur = () => set(false);
  return (
    <SearchFocusContext.Provider value={{ focused, bind: { onBlur, onFocus } }}>
      {children}
    </SearchFocusContext.Provider>
  );
};

export const useSearchFocus = () => useContext(SearchFocusContext);

export default SearchFocuspreview;
