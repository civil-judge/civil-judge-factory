import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
} from "@material-ui/core";
import React, { Suspense, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import AttemptIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import CorrectIcon from "@mui/icons-material/BeenhereSharp";
import TimeIcon from "@mui/icons-material/AccessTimeFilledSharp";

import { getUserDetails } from "../../redux/reducers/auth";
import { getData, ServerURL } from "../../helpers/FetchApi";
import { Feedback } from "../Feedback/Feedback";
import { Divider } from "@mui/material";
import { TooltipLight } from "../Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    transition: "all 0.3s ease-in-out",
    zIndex: 1,
    "&:hover": {
      transform: "scale(1.1)",
    },
    boxShadow: "0px 16px 32px 0px rgba(243, 238, 242, 0.8)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1",
  },
  cover: {
    width: "40%",
    backgroundSize: "contain",
    backgroundPosition: "right",
    margin: "1.4rem",
  },
  heading: {
    fontFamily: "Poppins",
  },
  centerAdornment: {
    marginLeft: "35%", // or your relevant measure
  },
  moreHeading: {
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      color: "#2a5884",
      textDecoration: "underline",
    },
  },
  tableContainer: {
    flex: 1,
    width: "100%",
  },
  paperContainer: {
    gap: "1rem",
    width: "100%",
    padding: "1rem",
    boxShadow: "0px 16px 32px 0px rgba(243, 238, 242, 0.8)",
  },
  tableHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    "& $span:nth-last-child(1)": {
      borderRight: "none",
    },
    // "& $span:nth-child(2)": {
    //   width: "50%",
    // },
  },
  tableBody: {
    marginTop: "0.5rem",
    // borderTop: "1px solid #999",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: '#dddddd50'
  },
  rowCell: {
    flex:1,
    textAlign: "center",
    padding: "1rem",
    // border: "1px solid #ddd",
  },
  col: {
    borderRight: "1px solid #999",
    flex: 1,
    textAlign: "center",
    fontWeight: 600,
    color: "#2a5884",
  },
  paper: {
    padding: "1rem",
    boxShadow: "0px 16px 32px 0px rgba(243, 238, 242, 0.8)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: "8rem",
    height: "8rem",
    backgroundSize: "cover",
  },
  rankAvatar: {
    width: "5.5rem",
    height: "5.5rem",
    fontSize: "2.5rem",
    // position: "absolute",
    top: "17%",
    left: "16%",
    // transform: "translateY(-6.8rem)",
  },
  username: {
    fontWeight: 600,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    width: "100%",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#2a5884",
    width: "33%",
    // borderRight: "1px solid #2a5884",
    "& $span": {
      fontSize: "0.8rem",
      marginTop: "0.4rem",
      color: "#000",
    },
  },
}));

export const MockResult = (props) => {
  const classes = useStyles();

  const [totalQuestions, setTotalQuestions] = React.useState(0);
  const [totalCorrect, setTotalCorrect] = React.useState(0);
  const [totalAttempt, setTotalAttempt] = React.useState(0);
  const [timeTaken, setTimeTaken] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);
  const [subjectName, setSubjectName] = React.useState("");
  const [mockName, setMockName] = React.useState("");
  const user = useSelector(getUserDetails);

  const fetchResultsbyId = async () => {
    var result = await getData("quiz/getQuizResultById/" + user.userid);
    console.log(result);
    setTotalQuestions(result.data[0].totalquestion);
    setTotalCorrect(result.data[0].totalcorrect);
    setTotalAttempt(result.data[0].totalattempt);
    let time = new Date(result.data[0].totaltime*1000).toISOString().slice(11, 19)
    setTimeTaken(time);
    setAccuracy(
      parseFloat(
        (result.data[0].totalcorrect / result.data[0].totalattempt) * 100
      ) || 0
    );
    setSubjectName(result.data[0].subjectname);
    setMockName(result.data[0].mockname);
  };

  const exitFullScreen = () => {
    var requestMethod =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozExitFullScreen ||
      document.msExitFullscreen;
    if (requestMethod) {
      // Native full screen.
      requestMethod.call(document);
      // setFullScreen(!fullScreen);
    }
  };

  useEffect(() => {
    exitFullScreen();
    fetchResultsbyId();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Header history={props.history} /> */}
      <Container style={{ marginTop: 120 }}>
        <h2 style={{ fontWeight: 600 }}>Performance Summary</h2>
        <Grid container spacing={2} style={{ paddingInline: 20 }}>
          <Grid item md={3} sm={6} xs={12}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.heading}
                  >
                    Attempted
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.heading}
                  >
                    {totalAttempt}/{totalQuestions}
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/images/writing.png"
                title="Attempted"
              />
            </Card>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.heading}
                  >
                    Correct
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.heading}
                  >
                    {totalCorrect}/{totalQuestions}
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/images/tick.png"
                title="Correct"
              />
            </Card>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.heading}
                  >
                    Time
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.heading}
                  >
                    {timeTaken}
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/images/wallclock.png"
                title="Time Taken"
              />
            </Card>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.heading}
                  >
                    Accuracy
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.heading}
                  >
                    {accuracy.toFixed(2)} %
                  </Typography>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/images/bar.png"
                title="Percentile"
              />
            </Card>
          </Grid>
        </Grid>
        <Feedback id={user.userid} course={subjectName} mockName={mockName} />
        <h3
          className={classes.moreHeading}
          onClick={() => props.history.push("/mocks")}
        >
          Not yet satisfied? Give More Mock Tests
        </h3>
        <h2 style={{ fontWeight: 600 }}>Leader board</h2>
        <Grid container spacing={2}>
          <Grid
            container
            item
            md={9}
            xs={12}
            className={classes.tableContainer}
          >
            <Paper className={[classes.paperContainer]}>
              <div className={classes.tableHead}>
                <span className={classes.col}>Rank</span>
                <span className={classes.col}>Name</span>
                <span className={classes.col}>Attempted</span>
                <span className={classes.col}>Correct</span>
                <span className={classes.col}>Time Taken</span>
              </div>
              <div className={classes.tableBody}>
                {[...Array(10)].map((x, i) => {
                  return (
                    <div className={classes.row} key={i}>
                      <span className={classes.rowCell}>{i + 1}</span>
                      <span className={classes.rowCell}>Nitin Verma</span>
                      <span className={classes.rowCell}>30</span>
                      <span className={classes.rowCell}>28</span>
                      <span className={classes.rowCell}>00:57:03</span>
                    </div>
                  );
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item container spacing={2} md={3} xs={12}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div
                  className={classes.badgeImage}
                  style={{
                    backgroundImage: `url(/images/gold.png)`,
                  }}
                >
                  <Avatar
                    className={classes.rankAvatar}
                    src={`${ServerURL}/images/IMG_20200404_213600_916.jpg`}
                  >
                    A
                  </Avatar>
                </div>
                <span className={classes.username}>Nitin Verma</span>
                <div className={classes.statsContainer}>
                  <TooltipLight title="Attempted">
                    <div className={classes.stat}>
                      <AttemptIcon />
                      <span>29</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Correct">
                    <div className={classes.stat}>
                      <CorrectIcon />
                      <span>29</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Time">
                    <div className={classes.stat} style={{ border: "none" }}>
                      <TimeIcon />
                      <span>1:34:04</span>
                    </div>
                  </TooltipLight>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div
                  className={classes.badgeImage}
                  style={{
                    backgroundImage: `url(/images/silver.png)`,
                  }}
                >
                  <Avatar className={classes.rankAvatar}>B</Avatar>
                </div>
                <span className={classes.username}>Nitin Verma</span>
                <div className={classes.statsContainer}>
                  <TooltipLight title="Attempted">
                    <div className={classes.stat}>
                      <AttemptIcon />
                      <span>29</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Correct">
                    <div className={classes.stat}>
                      <CorrectIcon />
                      <span>28</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Time">
                    <div className={classes.stat} style={{ border: "none" }}>
                      <TimeIcon />
                      <span>1:42:04</span>
                    </div>
                  </TooltipLight>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div
                  className={classes.badgeImage}
                  style={{
                    backgroundImage: `url(/images/bronze.png)`,
                  }}
                >
                  <Avatar className={classes.rankAvatar}>C</Avatar>
                </div>
                <span className={classes.username}>Nitin Verma</span>
                <div className={classes.statsContainer}>
                  <TooltipLight title="Attempted">
                    <div className={classes.stat}>
                      <AttemptIcon />
                      <span>29</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Correct">
                    <div className={classes.stat}>
                      <CorrectIcon />
                      <span>23</span>
                    </div>
                  </TooltipLight>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TooltipLight title="Time">
                    <div className={classes.stat} style={{ border: "none" }}>
                      <TimeIcon />
                      <span>1:52:04</span>
                    </div>
                  </TooltipLight>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};
