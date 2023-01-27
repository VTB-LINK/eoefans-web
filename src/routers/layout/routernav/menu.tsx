import { Menu, Button, MenuItem } from "@mui/material";
import { Omit } from "@utils/index";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { RouterList, TabProps, TabLink } from ".";
export default function MenuRouter() {
  return (
    <PopupState variant='popover' popupId='router-popup-menu'>
      {(popupState) => (
        <>
          <Button
            variant='text'
            {...bindTrigger(popupState)}
            sx={{
              padding: "12px 16px",
              minWidth: "90px",
            }}
          >
            首页
          </Button>
          <Menu {...bindMenu(popupState)} marginThreshold={0} elevation={2}>
            {RouterList.map((item, index) => (
              <RouterItem {...item} onClick={popupState.close} key={index} />
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
function RouterItem(props: TabProps & { onClick: () => void }) {
  return (
    <MenuItem onClick={props.onClick}>
      <TabLink {...Omit(props, "onClick")} />
    </MenuItem>
  );
}
