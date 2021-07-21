import Image from "next/image";
import styled from "styled-components";
import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useObserver } from "mobx-react";
import { useStore } from "../../State/StoreContext";
import Web from "web3";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5% 0 1.5%;
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 60px;
  background-color: #20b985;
`;
const Left = styled.div`
  display: flex;
  width: 13%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const UserInfo = styled.div`
  display: flex;
  height: 40px;
  padding: 0 10px 0 10px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const store = useStore();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Bar>
        <Left>
          <Image
            src="https://img.icons8.com/pastel-glyph/2x/robot-2.png"
            alt="Picture of the author"
            width={45}
            height={45}
          />
          <div>Ethereum Bridge</div>
        </Left>
        <Right>
          <UserInfo>
            {" "}
            {store.userAddress.substring(0, 4) +
              "..." +
              store.userAddress.substring(36, 42)}{" "}
          </UserInfo>
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Image
                src="https://image.flaticon.com/icons/png/512/60/60995.png"
                alt="Picture of the author"
                width={20}
                height={20}
              />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Github</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Right>
      </Bar>
    </>
  );
}