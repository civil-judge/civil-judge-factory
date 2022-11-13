import React, { Suspense } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Button } from "@material-ui/core";
import { Map, MenuBook, VideoLibrary } from "@material-ui/icons";

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
  strikediag: {
    // background:
    //   "linear-gradient(to left top, transparent 47.75%, white 49.5%, white 50.5%, transparent 52.25%)",
    display: "inline-block",
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      left: "-0.1em",
      right: "-0.1em",
      top: "0.38em",
      bottom: "0.38em",
      background:
        "linear-gradient(to left top, transparent 45.5%, #fff 47.5%, #fff 52.5%, transparent 54.5%)",
      pointerEvents: "none",
    },
  },
}));

export const CourseComponent = (props) => {
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
            height: props.selected === props.index ? "100%" : "0",
            opacity: props.selected === props.index ? 1 : 0,
          }}
          className={classes.dropshadow}
        >
          <div className={classes.boxIcon}>
            <Map fontSize="large" style={{ color: "#FFF" }} />
            <span className={classes.boxIconText} style={{ marginTop: 20 }}>
              {props?.item?.modulecount}
            </span>
            <span className={classes.boxIconText}>modules</span>
          </div>
          <div className={classes.boxIcon}>
            <MenuBook fontSize="large" style={{ color: "#FFF" }} />
            <span className={classes.boxIconText} style={{ marginTop: 20 }}>
              {props?.item?.pdfcount}
            </span>
            <span className={classes.boxIconText}>pdf</span>
          </div>
          <div className={classes.boxIcon}>
            <VideoLibrary fontSize="large" style={{ color: "#FFF" }} />
            <span className={classes.boxIconText} style={{ marginTop: 20 }}>
              {props?.item?.videocount}
            </span>
            <span className={classes.boxIconText}>videos</span>
          </div>
        </div>
      </Box>
      <Button
        onClick={props.onClick}
        fullWidth
        startIcon={props.icon}
        className={classes.btn}
      >
        {props.item.course_fee === 0 || props.item.course_offer_fee === 0 ? (
          "Free"
        ) : (
          <span>
            ONLY AT&nbsp;&nbsp;₹&nbsp;
            <span
            // className={props.item.course_offer_fee && classes.strikediag}
            >
              <s>{props.item.course_fee}</s>
            </span>
            &nbsp;&nbsp;
            {props.item.course_offer_fee && (
              <b
                style={{
                  color: "#FFF",
                  fontSize: "1rem",
                }}
              >
                {props.item.course_offer_fee}/-
              </b>
            )}
          </span>
        )}
      </Button>
    </Suspense>
  );
};
