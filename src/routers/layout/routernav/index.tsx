import { Button, ButtonGroup, Stack } from "@mui/material";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useRouterList } from "./tools";

export default function RouterNav() {
  const routerlists = useRouterList(),
    routerRes = useMemo(
      () =>
        routerlists.map((item) => (
          <NavLink to={item.pathname} key={item.id}>
            <Button>{item.name}</Button>
          </NavLink>
        )),
      [routerlists]
    );
  return (
    <Stack direction='row'>
      <ButtonGroup
        variant='text'
        sx={{
          alignItems: "center",
        }}
      >
        {routerRes}
      </ButtonGroup>
    </Stack>
  );
}
