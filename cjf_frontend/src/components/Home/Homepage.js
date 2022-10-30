import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Testimonial } from "./Testimonial";
import { Search } from "./Search";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "@keyframes fadeInLeft": {
      "0%": {
        opacity: 0,
        transform: "translateX(40px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    "@keyframes fadeInRight": {
      "0%": {
        opacity: 0,
        transform: "translateX(-40px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
    "@keyframes fadeInUp": {
      "0%": {
        opacity: 0,
        transform: "translateY(20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10vh",
    flexDirection: "column",
  },
  bannerGrid: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10vh",
    flexDirection: "column",
    animation: "fadeInLeft 0.6s ease-in-out",
  },
  title: {
    fontSize: 38,
    fontWeight: 600,
    width: 400,
    fontFamily: "Poppins",
    animation: "fadeInUp 0.6s",
    // backgroundColor: 'red',
    // transform: 'translateY(12px)'
  },
  btnBox: {
    marginTop: 30,
    backgroundColor: "#2a5884",
    padding: "15px 15px",
    borderRadius: 20,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    animation: "fadeInRight 0.6s ease-in-out",
    boxShadow: [
      "0px 5.1px 2.2px rgba(0, 0, 0, 0.02)",
      "0px 12.4px 5.3px rgba(0, 0, 0, 0.028)",
      "0px 23.3px 10px rgba(0, 0, 0, 0.035)",
      "0px 41.5px 17.9px rgba(0, 0, 0, 0.042)",
      "0px 77.7px 33.4px rgba(0, 0, 0, 0.05)",
      "0px 186px 80px rgba(0, 0, 0, 0.07)",
    ],
    "&:hover": {
      backgroundColor: "#2a5884",
      boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.3)"],
    },
  },
  btnText: {
    fontSize: 34,
    color: "#FFF",
    textTransform: "capitalize",
    fontWeight: 600,
    fontFamily: "Poppins",
    marginRight: 10,
  },
  india: {
    animation: "fadeInUp 0.6s",
    // backgroundColor: 'red',
  },
  video: {
    borderRadius: "2.5rem",
  },
}));

export const Homepage = (props) => {
  const classes = useStyles();

  return (
    <>
      <svg
        style={{ position: "absolute", zIndex: -1, bottom: 0 }}
        viewBox="0 0 1440 320"
      >
        <path
          fill="#5e98c250"
          fill-opacity="1"
          d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,149.3C840,117,960,75,1080,53.3C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <Container>
        <Grid container spacing={2} style={{ marginTop: 60 }}>
          <Grid container item xs={12} md={12}>
            <Grid
              item
              xs={12}
              md={6}
              className={classes.grid}
              style={{
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h1" className={classes.title}>
                  <span className={classes.india}>India's </span>
                  <span
                    style={{
                      color: "#2a5884",
                      fontWeight: 600,
                      // textShadow: "0px 0px 4px #999",
                    }}
                  >
                    One stop
                  </span>{" "}
                  Legal Destination.
                </Typography>
                <Box
                  component={Button}
                  variant="contained"
                  onClick={() => props.history.push("/courses")}
                  className={classes.btnBox}
                >
                  <Typography variant="h1" className={classes.btnText}>
                    Start Learning
                  </Typography>
                  <img src="/images/hammer.png" width={50} />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              // className={{...classes.grid,...classes.bannerGrid}}
              className={classes.bannerGrid}
              style={{
                alignItems: "center",
              }}
            >
              <img src="/images/banner1.png" />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className={classes.grid}>
            <video width="100%" height="100%" autoPlay muted loop>
              <source src="/images/CJFIntro.mp4" type="video/mp4" />
            </video>
            {/* <iframe
              title="intro"
              src="/images/CJFIntro.mp4"
              allow="accelerometer; muted; loop;autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              autoPlay
              controls={false}
              muted
              loop
              height="100%"
            ></iframe> */}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.grid}
            style={{ padding: 60 }}
          >
            <Testimonial />
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} className={classes.grid}>
          <Search />
        </Grid>
      </Container>
    </>
  );
};
