import { NavRouterItemType, router_nav_list } from "../nav/tools";
import { useState } from "react";
export function useRouterList(): NavRouterItemType[] {
  const [list, _] = useState<NavRouterItemType[]>(router_nav_list);
  return list;
}
