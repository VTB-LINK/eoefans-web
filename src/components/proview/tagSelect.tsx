import { NavQueryItemType } from "@routers/layout/nav/tools";
import {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactElement,
  useReducer,
} from "react";

type TagSelectProps = {
  children: ReactElement;
};
interface TagStates {
  tags: NavQueryItemType[];
}
enum TagsActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}
interface TagsAction {
  type: TagsActionKind;
  payload: NavQueryItemType;
}
const TagSelectContext = createContext<
  TagStates & {
    handerAddTag: (item: NavQueryItemType) => void;
    handerDeleteTag: (item: NavQueryItemType) => void;
  }
>({
  tags: [],
  handerAddTag: () => {},
  handerDeleteTag: () => {},
});
function reducer(state: TagStates, action: TagsAction) {
  const { type, payload } = action;
  switch (type) {
    case TagsActionKind.INCREASE:
      return { tags: [...state.tags, payload] };
    case TagsActionKind.DECREASE:
      return { tags: state.tags.filter((item) => item.id !== payload.id) };
    default:
      return state;
  }
}
const TagSelectProview = ({ children }: TagSelectProps) => {
  const [tags, tagsDispath] = useReducer(reducer, {
      tags: [] as NavQueryItemType[],
    }),
    handerAddTag = (item: NavQueryItemType) =>
      tagsDispath({ type: TagsActionKind.INCREASE, payload: item }),
    handerDeleteTag = (item: NavQueryItemType) =>
      tagsDispath({ type: TagsActionKind.DECREASE, payload: item });
  return (
    <TagSelectContext.Provider
      value={{ tags: tags.tags, handerAddTag, handerDeleteTag }}
    >
      {children}
    </TagSelectContext.Provider>
  );
};

export const useTagsSelected = () => useContext(TagSelectContext);

export default TagSelectProview;
