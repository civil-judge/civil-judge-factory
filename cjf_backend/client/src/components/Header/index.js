import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/reducers/auth";
import { Link, useHistory, useLocation } from "react-router-dom";

const pages = ["Courses", "Study Notes", "Mocks", "Store", "More"];

const StyledTypo = styled(Typography)`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  background: #2a5884;
  padding: 5px 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  curser: pointer;
  color: #fff;
  display: block;
  &:hover {
    transition: 0.3s;
    transform: translateY(-4px);
    background: #5e98c2;
  }
`;

const StyledSubMenuItem = styled(Link)`
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  color: #000;
  transition: 0.4s;
  &:hover {
    transform: translateX(5px);
    color: #5e98c2;
  }
`;

export const Header = (props) => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [profileAnchor, setProfileAnchor] = React.useState(null);

  const user = useSelector(getUserDetails);
  const dispatch = useDispatch();

  const handleMyMenuOpen = (event, page) => {
    if (page === "More") {
      setMyAnchorEl(event.currentTarget);
    } else {
      setMyAnchorEl(null);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const submenu = () => {
    const styles = {
      display: "flex",
      flexDirection: "column",
      color: "#000",
      width: "auto",
      flexWrap: "wrap",
      cursor: "pointer",
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0px 16px 32px 0px rgba(223, 223, 223, 0.8)",
          zIndex: 1,
          color: "#000",
          gap: 10,
          cursor: "pointer",
          // fontFamily: 'Poppins'
        }}
        onMouseLeave={() => setMyAnchorEl(null)}
        onClick={() => setMyAnchorEl(null)}
      >
        <StyledSubMenuItem to="/communityforum">
          Community/Forum
        </StyledSubMenuItem>
        <StyledSubMenuItem to="/opportunities">
          Legal Opportunities
        </StyledSubMenuItem>
        <StyledSubMenuItem to="/aboutus">About Us</StyledSubMenuItem>
      </div>
    );
  };

  const logout = () => {
    setProfileAnchor(null);
    dispatch({
      type: "USER_LOGOUT",
    });
    history.push("/");
  };

  const profileMenu = () => {
    return (
      <div onMouseLeave={() => setProfileAnchor(null)}>
        <Menu
          id="menu"
          anchorEl={profileAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{
            style: {
              boxShadow: "0px 16px 32px 0px rgba(243, 238, 242, 0.8)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              history.push("/profile");
              setProfileAnchor(null);
            }}
          >
            <span style={{ fontFamily: "Poppins" }}>Your Profile</span>
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <span style={{ fontFamily: "Poppins" }}>Log out</span>
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const open = Boolean(myAnchorEl);
  const id = open ? "transitions-popper" : undefined;

  const openProfile = Boolean(profileAnchor);
  const idProfile = openProfile ? "profile-popper" : undefined;

  const handleRedirect = (page) => {
    const path = page.toLowerCase().replace(" ", "");
    history.push(`/${path}`);
  };

  const { pathname } = useLocation();

  if (
    pathname == "/admin" ||
    pathname == "/dashboard" ||
    pathname == "/mocktest" ||
    pathname == "/comingsoon"
  )
    return null;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        height: 100,
        backgroundColor: "#FFF",
        zIndex: 999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            style={{ padding: 30, marginTop: 0, marginRight: 180 }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <img
              src="/images/02.png"
              alt="logo"
              style={{
                display: { xs: "flex", md: "none" },
                flex: 1,
                height: "70px",
                filter: "drop-shadow(1px 1px 0.5px #000)",
              }}
              onClick={() => history.push("/")}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleRedirect(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Typography
                key={page}
                style={{
                  background: page !== "Store" ? "#fff" : "#2a588450",
                  borderRadius: page === "Store" ? 20 : 0,
                  padding: page === "Store" ? "5px 20px" : "0px 20px",
                  fontSize: 18,
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
                onMouseOver={(event) => handleMyMenuOpen(event, page)}
                onClick={() => handleRedirect(page)}
                sx={{
                  my: 2,
                  color: page !== "Store" ? "#000" : "#2a5884",
                  fontWeight: page === "Store" ? "bold" : "normal",
                  // textShadow: page === "Store" ? "0px 0px 2px #999" : "none",
                  display: "block",
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>
          <React.Fragment>
            <ClickAwayListener onClickAway={() => setMyAnchorEl(null)}>
              <Popper
                disablePortal
                // style={{ zIndex:1 }}
                id={id}
                open={open}
                transition
                anchorEl={myAnchorEl}
                placement="bottom-start"
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    {submenu()}
                  </Fade>
                )}
              </Popper>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={() => setProfileAnchor(null)}>
              <Popper
                disablePortal
                // style={{ zIndex:1 }}
                id={idProfile}
                open={openProfile}
                transition
                anchorEl={profileAnchor}
                placement="bottom-start"
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    {profileMenu()}
                  </Fade>
                )}
              </Popper>
            </ClickAwayListener>
          </React.Fragment>

          <Box
            sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}
            onClick={() => {
              user?.username
                ? history.push("/profile")
                : history.push("/login");
            }}
            onMouseOver={(event) => {
              user?.username && setProfileAnchor(event.currentTarget);
            }}
          >
            <StyledTypo
              style={{
                cursor: "pointer",
              }}
            >
              {user?.username || "Login"}
            </StyledTypo>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
