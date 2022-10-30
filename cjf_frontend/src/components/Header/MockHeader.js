import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@material-ui/core";
import Timer from "../Timer/timer";
import { errorMessage } from "../../helpers/checks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    padding:0,
    margin:0
  },
}));

export default function MockHeader(props) {
  const classes = useStyles();

  const [fullScreen, setFullScreen] = React.useState(true);

  const requestFullScreen = () => {
    if (fullScreen) {
      var el = document.documentElement;
      // Supports most browsers and their versions.
      var requestMethod =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (requestMethod) {
        // Native full screen.
        requestMethod.call(el);
        setFullScreen(!fullScreen);
      }
    } else {
      var requestMethod =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozExitFullScreen ||
        document.msExitFullscreen;
      if (requestMethod) {
        // Native full screen.
        requestMethod.call(document);
        setFullScreen(!fullScreen);
      }
    }
  };

  useEffect(() => {
    requestFullScreen();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" elevation={3} color="#FFF">
        <Toolbar>
          <Box
            style={{ padding: 10, marginRight: 20 }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <img
              src="/images/02.png"
              alt="logo"
              style={{
                display: { xs: "flex", md: "none" },
                flex: 1,
                height: "50px",
                filter : "drop-shadow(1px 1px 0.5px #000)"
              }}
            />
          </Box>
          <h3 variant="h6" className={classes.title}>
            {props.testname}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "#99999950",
              padding: 10,
            //   width: "20vw",
            }}
          >
            <div style={{
                width: "auto",
                display: "flex",
              flexDirection: "row",
              marginLeft:25
              
            }}>
            Time Left :&nbsp;&nbsp;
            <Timer
              initialHour={props.initialHour}
              initialMinute={props.initialMinute}
              initialSeconds={props.initialSeconds}
              onTimeout={props.onTimeout}
              onCloseTime={() => errorMessage("Hurry! Only 2 minutes left",4000)}
            />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
