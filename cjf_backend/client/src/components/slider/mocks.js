import { Button, Container, Grid, Paper } from "@material-ui/core";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postData, ServerURL } from "../../helpers/FetchApi";
import { getUserDetails, isLoggedIn } from "../../redux/reducers/auth";
import { Header } from "../Header";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  LiveHelp,
  Lock,
  Map,
  Schedule,
  Share,
  Stars,
} from "@material-ui/icons";
import { Footer } from "../Footer/Footer";
import { errorMessage } from "../../helpers/checks";

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: "80%",
    borderRadius: "10px",
    boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.2)"],
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    borderRadius: "50%",
    backgroundColor: "ButtonShadow",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2a5884",
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins",
    padding: "10px 20px",
    boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.3)"],
    "&:hover": {
      backgroundColor: "#2a5884",
      color: "#FFF",
    },
  },
  shareButton: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "Poppins",
    padding: "10px 20px",
    boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.2)"],
  },
  title2: {
    width: "100%",
    fontSize: 30,
    fontFamily: "Poppins",
    color: "#2a5884",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    fontWeight: 600,
    marginBottom: 10,
  },
}));

export const Mocks = (props) => {
  var mock = props.location.state.item;

  const classes = useStyles();

  const [mockTestList, setMockTestList] = useState([]);
  const isLogIn = useSelector(isLoggedIn);
  const userDetails = useSelector(getUserDetails);
  const [isPurchased, setIsPurchased] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const fetchMockTests = async () => {
    var body = { mocktest_subject: mock.mocktest_name };
    var result = await postData("quiz/fetchMockQuizbySubject", body);
    setMockTestList(result.data);
    setTotalQuestions(result.total_questions);
  };

  const checkPurchased = async () => {
    if (mock.mocktest_price === 0) {
      return setIsPurchased(true);
    }
    if (isLogIn) {
      let body = {
        userid: userDetails.userid,
        mockseries: mock.mocktest_name,
      };
      let response = await postData("mocks/checkPurchasedMock", body);
      if (response.success && response.data.length > 0) {
        return setIsPurchased(true);
      }
    }
  };

  useEffect(() => {
    fetchMockTests();
    checkPurchased();
  }, []);

  const handleClick = (item) => {
    if (isLogIn) {
      if (isPurchased) {
        return props.history.push({ pathname: "/mocktest" }, { quiz: item });
      }
      return errorMessage("You need to purchase this mocktest first");
    } else {
      props.history.push({ pathname: "/login" });
    }
  };

  return (
    <Suspense>
      {/* <Header history={props.history} /> */}
      <Container style={{ marginTop: 150 }}>
        <Container
          style={{
            padding: "0px 40px 40px 40px",
            boxShadow: "0px 16px 32px 0px rgba(233, 238, 242, 0.4)",
          }}
        >
          <Grid container spacing={1}>
            <Grid container item md={4} justifyContent="center">
              <img
                src={`${ServerURL}/images/${mock.picture}`}
                className={classes.coverImage}
              />
            </Grid>
            <Grid item md={5} style={{ paddingRight: 30 }}>
              <div style={{ height: "15rem" }}>
                <h2 className={classes.title2}>{mock.mocktest_name}</h2>
                <p style={{ textAlign: "justify" }}>
                  {mock.mocktest_description}
                </p>
              </div>
              <div className={classes.bottomContainer}>
                <div className={classes.iconContainer}>
                  <span className={classes.icon}>
                    <Map style={{ color: "gray" }} />
                  </span>
                  <span>{mockTestList.length} tests</span>
                </div>
                <div className={classes.iconContainer}>
                  <span className={classes.icon}>
                    <LiveHelp style={{ color: "gray" }} />
                  </span>
                  <span>{totalQuestions} questions</span>
                </div>
              </div>
            </Grid>
            <Grid container item md={3} direction="column">
              {isPurchased ? (
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  {mock.mocktest_price === 0
                    ? "Free"
                    : `Purchased`}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  size="large"
                  className={classes.button}
                >
                  {mock.mocktest_price === 0
                    ? "Free"
                    : `Start Now@ ₹ ${mock.mocktest_price}`}
                </Button>
              )}
              <Button
                variant="outlined"
                fullWidth
                size="large"
                className={classes.shareButton}
                endIcon={<Share />}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </Container>
        <div
          style={{
            marginTop: 20,
          }}
        >
          {mockTestList.length > 0 ? (
            mockTestList.map((item, index) => {
              return (
                <Paper
                  key={index}
                  style={{
                    marginTop: 20,
                    padding: 20,
                  }}
                >
                  <Grid container spacing={1} justifyContent="space-between">
                    <Grid container item md={10} direction="column">
                      <span style={{ fontFamily: "Poppins", fontWeight: 600 }}>
                        {item.quiz_name}
                      </span>
                      <div
                        style={{
                          marginTop: 10,
                          display: "flex",
                          flexDirection: "row",
                          gap: 20,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            color: "gray",
                          }}
                        >
                          <Schedule /> &nbsp;&nbsp;{item.quiz_duration}
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            color: "gray",
                          }}
                        >
                          <LiveHelp /> &nbsp;&nbsp;{item.individual_count}{" "}
                          Questions
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            color: "gray",
                          }}
                        >
                          <Stars /> &nbsp;&nbsp;
                          {item.quiz_difficulty
                            .charAt(0)
                            .toUpperCase()
                            .concat(item.quiz_difficulty.slice(1))}
                        </span>
                      </div>
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        onClick={() => handleClick(item)}
                        variant="outlined"
                        size="large"
                        style={{ float: "right" }}
                        startIcon={!isPurchased && <Lock />}
                      >
                        Start Now
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          ) : (
            <h5 style={{ textAlign: "center", marginTop: 40 }}>
              No Mock Tests with questions found under this subject
            </h5>
          )}
        </div>
      </Container>
    </Suspense>
  );
};
