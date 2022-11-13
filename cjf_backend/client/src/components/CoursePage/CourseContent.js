import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useActiveMenu } from "react-active-menu";
import {
  LiveHelp,
  Lock,
  Map,
  MenuBook,
  Schedule,
  Share,
  Stars,
  VideoLibrary,
} from "@material-ui/icons";
import { postData, ServerURL } from "../../helpers/FetchApi";
import { useSelector } from "react-redux";
import { getUserDetails, isLoggedIn } from "../../redux/reducers/auth";
import { Document, Page, pdfjs } from "react-pdf";
import { Feedback } from "../Feedback/Feedback";
import { OverallReview } from "../../ReviewComponent/OverallReview";
import { UserReviews } from "../../ReviewComponent/UserReviews";
import timeme from "timeme.js";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  triggers: {
    "& $ul": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    "& $li": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      transition: "0.3s ease",
    },
    "& $button": {
      background: "none",
      border: "none",
      color: "#FFF",
      transition: "0.3s ease",
      cursor: "pointer",
      fontFamily: "inherit",
      padding: "0",
    },
    "& $button:active": {
      //   fontSize: "1rem",
      //   fontWeight: "bold",
      opacity: 0.5,
    },
  },
  sections: {
    margin: "1.5rem 0 2rem 2rem",
  },
  activeButton: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: "2rem",
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
    backgroundColor: "#ddd",
  },
  description: {
    fontFamily: "Poppins",
    color: "#9E9E9E",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    lineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  sideContainer: {
    backgroundColor: "#2a5884",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    WebkitBackdropFilter: "blur(20px)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px 0 rgba( 0, 0, 0, 0.37)",
    border: "1px solig rgba ( 255, 255, 255, 0. 18)",
  },
  enrollButton: {
    // marginTop: 30,
    backgroundColor: "#2a5884",
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins",
    padding: "10px 30px",
    boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.3)"],
    // borderRadius: '5rem',
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
    // borderRadius: '5rem',
    boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.2)"],
  },
  bullet: {
    marginInline: "0.5rem",
    width: "0.4rem",
    height: "0.4rem",
    borderRadius: "50%",
    backgroundColor: "#FFF",
    display: "inline-block",
    transition: "0.3s ease",
  },
  objectiveList: {
    listStyle: "inside none",
    "& $li": {
      lineHeight: "2rem",
    },
    "& $li:before": {
      content: "'\\2714'",
      marginInline: "1rem",
    },
  },
  fadeOut: {
    position: "relative",
    // height: "5rem",
    "&:after": {
      content: "''",
      height: "50%",
      width: "100%",
      position: "absolute",
      bottom: 0,
      background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)",
    },
  },
  pdfContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
  },
  pdf: {
    width: "13.5rem",
    height: 200,
    overflow: "hidden",
    border: "1px solid #ddd",
    cursor: "pointer",
    transition: "0.4s ease",
    "&:before": {
      content: '"\\f1c1"',
      position: "absolute",
      fontFamily: "'FontAwesome'",
      fontSize: "2.5rem",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      transition: "0.4s ease",
      alignItems: "center",
      // fontWeight: "bold",
      color: "#FFF",
      backgroundColor: "rgba(0,0,0,0.7)",
      opacity: 0,
    },
    "&:hover:before": {
      opacity: 1,
    },
  },
  pdfText: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Poppins",
    textTransform: "capitalize",
    width: 200,
    padding: "10px 0px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.4s ease",
    "&:hover": {
      color: "#2a5884",
    },
  },
  mockContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginRight: "1rem",
  },
  video: {
    cursor: "pointer",
    transition: "0.4s ease",
    // width: "18rem",
    // aspectRatio: "1 / 1",
    // height: 180,
    overflow: "hidden",
    "&:before": {
      content: '"\\f008"',
      position: "absolute",
      fontFamily: "'FontAwesome'",
      fontSize: "2.5rem",
      width: "280px",
      height: "170px",
      display: "flex",
      justifyContent: "center",
      transition: "0.4s ease",
      alignItems: "center",
      // fontWeight: "bold",
      color: "#FFF",
      backgroundColor: "rgba(0,0,0,0.7)",
      opacity: 0,
    },
    "&:hover:before": {
      opacity: 1,
    },
  },
  videoText: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Poppins",
    textTransform: "capitalize",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.4s ease",
    "&:hover": {
      color: "#2a5884",
    },
  },
  lockedContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "-3rem",
    marginTop: "2rem",
    boxShadow: "0px -10px 10px 0px rgba(0,0,0,0.10)",
    padding: "1rem",
    "& $h2": {
      marginBottom: 0,
    },
    "& $p": {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
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
        "linear-gradient(to left top, transparent 45.5%, red 47.5%, red 52.5%, transparent 54.5%)",
      pointerEvents: "none",
    },
  },
}));

const CourseContent = (props) => {
  const { id } = useParams();

  const courseSeries = props.location.state.item;

  const classes = useStyles();
  const isLogIn = useSelector(isLoggedIn);
  const userDetails = useSelector(getUserDetails);

  const [sections, setSections] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [mockTestList, setMockTestList] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [reviews, setReviews] = useState([]);

  const checkPurchased = async () => {
    if (courseSeries.course_fee === 0) {
      return setIsPurchased(true);
    }
    if (isLogIn) {
      let body = {
        userid: userDetails.userid,
        courseid: courseSeries.course_id,
      };
      let response = await postData("courses/checkPurchasedCourse", body);
      if (response.success && response.data.length > 0) {
        return setIsPurchased(true);
      }
    }
  };

  const fetchMockTests = async () => {
    var body = { mocktest_subject: courseSeries.course_name };
    var result = await postData("quiz/fetchMockQuizbySubject", body);
    setMockTestList(result.data);
  };

  const fetchCourseContents = async () => {
    let body = { courseid: id };
    let result = await postData("courses/getCourseContent", body);
    if (result.success) {
      setSections(result.sections);
      setPdfList(result.pdf);
      setVideoList(result.videos);
    }
  };

  const [reviewCount, setReviewCount] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const fetchReviewsByCourse = async () => {
    let body = { subjectname: courseSeries.course_name };
    let result = await postData("courses/fetchFeedbackByCourse", body);
    if (result.success) {
      setReviews(result.data);
      setReviewCount({
        5: result.data.filter((review) => review.rating === 5).length,
        4: result.data.filter((review) => review.rating === 4).length,
        3: result.data.filter((review) => review.rating === 3).length,
        2: result.data.filter((review) => review.rating === 2).length,
        1: result.data.filter((review) => review.rating === 1).length,
      });
    }
  };

  const handleClick = (item) => {
    if (isLogIn) {
      // if (isPurchased) {
      return props.history.push({ pathname: "/mocktest" }, { quiz: item });
      // }
      // return errorMessage("You need to purchase this mocktest first");
    } else {
      props.history.push({ pathname: "/login" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    checkPurchased();
    fetchCourseContents();
    fetchMockTests();
    fetchReviewsByCourse();
    timeme.stopTimer();
    timeme.setCurrentPageName((Math.random() + 1).toString(36).substring(7));
    timeme.startTimer();
    return () => {
      sendTimeSpent(timeme.getTimeOnCurrentPageInSeconds());
    };
  }, []);

  const fetchPrevSpentTime = async () => {
    if (isLogIn) {
      let body = {
        userid: userDetails.userid,
        pageName: "Courses",
      };
      let response = await postData("user/getPrevSpentTime", body);
      if (response.success) {
        return response.data[0].spent_time || 0;
      }
      return 0;
    }
  };

  const sendTimeSpent = async (time) => {
    let prevTime = (await fetchPrevSpentTime()) || 0;
    let body = {
      userId: userDetails.userid,
      learningTime: prevTime + time,
      pageName: "Courses",
    };
    await postData("user/insertLearningTime", body);
  };

  const { activeId, registerSection, registerTrigger } = useActiveMenu({
    smooth: true,
    offset: 220,
  });

  const LockedContent = () => {
    return (
      <div>
        <div className={classes.lockedContainer}>
          <Lock fontSize="large" style={{ marginTop: "2rem" }} />
          <h2>Unlock this full course now !</h2>
          <p>
            ONLY AT&nbsp;&nbsp;₹&nbsp;
            {courseSeries.course_offer_fee && (
              <>
                <span
                  className={
                    courseSeries.course_offer_fee && classes.strikediag
                  }
                >
                  {courseSeries.course_fee}
                </span>
                &nbsp;&nbsp;
              </>
            )}
            <b
              style={{
                color: "#2a5884",
                fontSize: "1.5rem",
              }}
            >
              {courseSeries.course_offer_fee
                ? courseSeries.course_offer_fee
                : courseSeries.course_fee}
              /-
            </b>
          </p>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.enrollButton}
          >
            Enroll Now
          </Button>
        </div>
        {/* <article
          style={{
            filter: "blur(5px)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <p>
            Donec et orci aliquet nisl suscipit molestie sed sit amet tortor.
            Duis vel urna ac mi sollicitudin lacinia mollis sit amet lorem. Sed
            finibus erat nec libero scelerisque fringilla. Morbi at orci sed
            urna vulputate vulputate. Nulla facilisi.Morbi at orci sed urna
            vulputate vulputate. Nulla facilisi. Donec et orci aliquet nisl
            suscipit molestie sed sit amet tortor. Duis vel urna ac mi
            sollicitudin lacinia mollis sit amet lorem. Sed finibus erat nec
            libero scelerisque fringilla. Morbi at orci sed urna vulputate
            vulputate. Nulla facilisi. Donec et orci aliquet nisl suscipit
            molestie sed sit amet tortor. Duis vel urna ac mi sollicitudin
            lacinia mollis sit amet lorem. Sed finibus erat nec libero
            scelerisque fringilla. Morbi at orci sed urna vulputate vulputate.
            Nulla facilisi.
          </p>
        </article> */}
      </div>
    );
  };

  const UnlockedContent = () => {
    return (
      <>
        {sections.map((item, i) => {
          return (
            <section ref={registerSection(`section-${i + 1}`)}>
              <h2>{item.section_title}</h2>
              {parse(item.section_content)}
            </section>
          );
        })}
        <section ref={registerSection("pdf")}>
          <h2>PDF</h2>
          <div className={classes.pdfContainer}>
            {pdfList.map((item, i) => {
              return (
                <div
                  onClick={() =>
                    props.history.push(
                      {
                        pathname: "/courses/pdf",
                      },
                      {
                        pdf: item,
                      }
                    )
                  }
                >
                  <Document file={`${ServerURL}/pdf/${item.pdfname}`}>
                    <Page height="300" className={classes.pdf} pageNumber={1} />
                  </Document>
                  <Typography className={classes.pdfText}>
                    {item.pdfname.slice(0, -4)}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>
        <section ref={registerSection("mocks")}>
          <h2>Mocks</h2>
          <div className={classes.mockContainer}>
            {mockTestList.length > 0 ? (
              mockTestList.map((item, index) => {
                return (
                  <Paper
                    key={index}
                    style={{
                      // margin: '1rem',
                      padding: "1.2rem",
                    }}
                  >
                    <Grid container spacing={1} justifyContent="space-between">
                      <Grid container item md={10} direction="column">
                        <span
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                          }}
                        >
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
                            <Schedule /> &nbsp;&nbsp;
                            {item.quiz_duration}
                          </span>
                          <span
                            style={{
                              fontSize: 14,
                              display: "flex",
                              alignItems: "center",
                              color: "gray",
                            }}
                          >
                            <LiveHelp /> &nbsp;&nbsp;
                            {item.individual_count} Questions
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
                          // startIcon={!isPurchased && <Lock />}
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
        </section>
        <section ref={registerSection("video")}>
          <h2>Videos</h2>
          <div className={classes.pdfContainer}>
            {videoList.length > 0 &&
              videoList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      props.history.push(
                        {
                          pathname: "/courses/video",
                        },
                        {
                          video: item,
                        }
                      )
                    }
                    className={classes.video}
                  >
                    <video width="280" height="180" muted>
                      <source
                        src={`${ServerURL}/videos/${item.videoname}`}
                        type="video/mp4"
                      />
                    </video>
                    <Typography className={classes.videoText}>
                      {item.videoname.slice(0, -4)}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ marginTop: 100 }}>
        <Grid container spacing={0}>
          <Grid
            item
            container
            sm={4}
            md={3}
            direction="column"
            alignItems="center"
            className={classes.sideContainer}
          >
            <div
              style={{
                width: "70%",
                transform: "translateX(50%)",
              }}
            >
              <img
                src={`${ServerURL}/images/${courseSeries.picture}`}
                width="100%"
                style={{
                  borderRadius: "0.5rem",
                }}
              />
            </div>
            <div style={{ position: "sticky", top: 100 }}>
              <h2 style={{ color: "#FFF" }}>Course Contents</h2>
              <nav className={classes.triggers}>
                <ul>
                  <li>
                    <span
                      className={activeId == `intro` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `intro` && classes.activeButton}
                      ref={registerTrigger(`intro`)}
                      type="button"
                    >
                      Course Introduction
                    </button>
                  </li>
                  <li>
                    <span
                      className={activeId == `objectives` && classes.bullet}
                    ></span>
                    <button
                      className={
                        activeId == `objectives` && classes.activeButton
                      }
                      ref={registerTrigger(`objectives`)}
                      type="button"
                    >
                      Course Objectives
                    </button>
                  </li>
                  {sections.map((item, i) => {
                    return (
                      <li>
                        <span
                          className={
                            activeId == `section-${i + 1}` && classes.bullet
                          }
                        ></span>
                        <button
                          className={
                            activeId == `section-${i + 1}` &&
                            classes.activeButton
                          }
                          ref={registerTrigger(`section-${i + 1}`)}
                          type="button"
                        >
                          {item.section_title}
                        </button>
                        {!isPurchased && (
                          <Lock
                            style={{
                              color: "#FFF",
                              fontSize: "0.8rem",
                              marginInline: "0.5rem",
                            }}
                          />
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <span
                      className={activeId == `pdf` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `pdf` && classes.activeButton}
                      ref={registerTrigger(`pdf`)}
                      type="button"
                    >
                      PDF
                    </button>
                    {!isPurchased && (
                      <Lock
                        style={{
                          color: "#FFF",
                          fontSize: "0.8rem",
                          marginInline: "0.5rem",
                        }}
                      />
                    )}
                  </li>
                  <li>
                    <span
                      className={activeId == `mocks` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `mocks` && classes.activeButton}
                      ref={registerTrigger(`mocks`)}
                      type="button"
                    >
                      Mocks
                    </button>
                    {!isPurchased && (
                      <Lock
                        style={{
                          color: "#FFF",
                          fontSize: "0.8rem",
                          marginInline: "0.5rem",
                        }}
                      />
                    )}
                  </li>
                  <li>
                    <span
                      className={activeId == `video` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `video` && classes.activeButton}
                      ref={registerTrigger(`video`)}
                      type="button"
                    >
                      Videos
                    </button>
                    {!isPurchased && (
                      <Lock
                        style={{
                          color: "#FFF",
                          fontSize: "0.8rem",
                          marginInline: "0.5rem",
                        }}
                      />
                    )}
                  </li>
                  <li>
                    <span
                      className={activeId == `feedback` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `feedback` && classes.activeButton}
                      ref={registerTrigger(`feedback`)}
                      type="button"
                    >
                      Share your feedback
                    </button>
                  </li>
                  <li>
                    <span
                      className={activeId == `review` && classes.bullet}
                    ></span>
                    <button
                      className={activeId == `review` && classes.activeButton}
                      ref={registerTrigger(`review`)}
                      type="button"
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </Grid>
          <Grid container item sm={8} md={9}>
            <Grid
              container
              style={{
                marginLeft: "7.5rem",
                marginTop: "1rem",
                marginBottom: "4rem",
                display: "flex",
              }}
            >
              <Grid item md={8}>
                <h1 style={{ color: "#2a5884" }}>{courseSeries.course_name}</h1>
                <p className={classes.description}>
                  {courseSeries.course_description}
                </p>
                <div className={classes.bottomContainer}>
                  <div className={classes.iconContainer}>
                    <span className={classes.icon}>
                      <Map style={{ color: "gray" }} />
                    </span>
                    <span>{sections.length} modules</span>
                  </div>
                  <div className={classes.iconContainer}>
                    <span className={classes.icon}>
                      <MenuBook style={{ color: "gray" }} />
                    </span>
                    <span>{pdfList.length} pdf</span>
                  </div>
                  <div className={classes.iconContainer}>
                    <span className={classes.icon}>
                      <VideoLibrary style={{ color: "gray" }} />
                    </span>
                    <span>{videoList.length} videos</span>
                  </div>
                </div>
              </Grid>
              <Grid item md={4} style={{ padding: "2.5rem 1.5rem 0rem 0rem" }}>
                {isPurchased ? (
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    className={classes.enrollButton}
                  >
                    {courseSeries.course_fee === 0 ? "Free" : `Purchased`}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    className={classes.enrollButton}
                  >
                    {courseSeries.course_fee === 0 ||
                    courseSeries.course_offer_fee === 0
                      ? "Free"
                      : `Enroll @ ₹ ${courseSeries.course_offer_fee}`}
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
            <div>
              <div className={classes.sections}>
                <section ref={registerSection("intro")}>
                  <h2>Course Introduction</h2>
                  <p>
                    The course aims to provide an extensive and career oriented
                    course on {courseSeries.course_name}. The course in terms of
                    importance, versatility and practicality incorporates almost
                    each and every aspect and important provisions of{" "}
                    {courseSeries.course_name}.
                  </p>
                </section>
                <section
                  ref={registerSection("objectives")}
                  className={!isPurchased && classes.fadeOut}
                >
                  <h2>Course Objectives</h2>
                  <ul className={classes.objectiveList}>
                    <li>
                      To provide an extensive career-oriented course for
                      achieving proficiency in {courseSeries.course_name}.
                    </li>
                    <li>
                      To explain all the important aspects, concepts and issues
                      of {courseSeries.course_name}.
                    </li>
                    <li>
                      To understand the basic structure of{" "}
                      {courseSeries.course_name}.
                    </li>
                    <li>
                      To discuss the provisions of {courseSeries.course_name}.
                    </li>
                    <li>
                      To discuss the bone of contention of{" "}
                      {courseSeries.course_name}.
                    </li>
                    <li>
                      To highlight the judicial point of view on{" "}
                      {courseSeries.course_name}.
                    </li>
                  </ul>
                </section>
                {isPurchased ? UnlockedContent() : LockedContent()}

                <section ref={registerSection("feedback")}>
                  <h2>Share your feedback</h2>
                  <div className={classes.feedBackContainer}>
                    <Feedback
                      id={userDetails.userid}
                      course={courseSeries.course_name}
                      fetchReviews={fetchReviewsByCourse}
                    />
                  </div>
                </section>
                <section ref={registerSection("review")}>
                  <h2>Reviews</h2>
                  <div className={classes.reviewContainer}>
                    <OverallReview reviews={reviewCount} />
                  </div>
                  <div>
                    {reviews.length > 0 &&
                      reviews.map((review) => {
                        return <UserReviews key={review.id} review={review} />;
                      })}
                  </div>
                </section>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Suspense>
  );
};

export default CourseContent;
