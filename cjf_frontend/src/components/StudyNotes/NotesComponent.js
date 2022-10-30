import React, { Suspense } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Button } from "@material-ui/core";
import { Lock } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title2: {
    width: "100%",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Poppins",
    color: "#5e98c2",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    fontWeight: 600,
    marginBottom: 40,
  },
  courseBox: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    transition: "all 0.4s",
  },
  courseTitle: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 16,
    flexWrap: "wrap",
    padding: "5px 0px",
  },
  btn: {
    backgroundColor: "#2a5884",
    borderRadius: "0 0 0.5rem 0.5rem",
    color: "#FFF",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Poppins",
    padding: "10px 0px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#2a5884",
      color: "#FFF",
    },
  },
  dropshadow: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    transition: "0.4s ease",
    borderRadius: "0.5rem 0.5rem 0 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  boxIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxIconText: {
    color: "#FFF",
    textTransform: "lowercase",
    fontFamily: "Poppins",
  },
}));

export const NotesComponent = (props) => {
  const classes = useStyles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box
        component={Button}
        onClick={props.onClick}
        className={classes.courseBox}
      >
        <img
          src={props.picture}
          width="100%"
          alt="mock"
          style={{
            borderRadius: "0.5rem 0.5rem 0 0",
          }}
        />
        <div
          style={{
            height: "100%",
            opacity: 1,
          }}
          className={classes.dropshadow}
        >
          <div className={classes.boxIcon}>
            <Lock fontSize="large" style={{ color: "#FFF",fontSize: 60 }} />
            {/* <span className={classes.boxIconText} style={{ marginTop: 20 }}>
              {props?.item?.modulecount}
            </span>
            <span className={classes.boxIconText}>modules</span> */}
          </div>
        </div>
      </Box>
      <Button
        onClick={props.onClick}
        fullWidth
        startIcon={props.icon}
        className={classes.btn}
      >
        {props.btnText}
      </Button>
    </Suspense>
  );
};
