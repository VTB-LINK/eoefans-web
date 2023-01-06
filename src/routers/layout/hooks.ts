import { useState } from "react";

export const useFocus = () => {
  const [focused, set] = useState<boolean>(false);
  return {
    focused,
    bind: {
      onFocus: () => set(true),
      onBlur: () => set(false),
    },
  };
};
