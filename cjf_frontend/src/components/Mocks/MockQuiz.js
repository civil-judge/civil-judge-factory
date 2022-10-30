import React, { Suspense, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Hidden,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { postData } from "../../helpers/FetchApi";
import MockHeader from "../Header/MockHeader";
import QaList from "./QaList";
import {
  Clear,
  NavigateBefore,
  NavigateNext,
  TurnedIn,
  TurnedInNot,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getMarked,
  getQuestionIndex,
  getQuestionList,
  getQuizTimer,
  getResponse,
} from "../../redux/reducers/global";
import parse from "html-react-parser";
import { getUserDetails } from "../../redux/reducers/auth";
import { errorMessage } from "../../helpers/checks";
import timeme from "timeme.js";

export const MockQuiz = (props) => {
  var quiz = props.location.state.quiz;

  const questionList = useSelector(getQuestionList) || [];

  //////////////////////////////////////// Sample Mock ////////////////////////////////////////////////

  const dispatch = useDispatch();
  const marked = useSelector(getMarked) || [];
  const quizTimer = useSelector(getQuizTimer) || quiz.quiz_duration;
  const currentIndex = useSelector(getQuestionIndex) || 0;
  const resp = useSelector(getResponse) || [];
  const [response, setResponse] = useState(resp);
  const user = useSelector(getUserDetails);

  function handleOnCellClick(index) {
    dispatch({
      type: "SET_QUESTION_INDEX",
      payload: index,
    });
    dispatch({
      type: "SET_RESPONSE",
      payload: response,
    });
  }
  function handleClearResponse(ques) {
    // console.info("clear response", ques);
    const newArray = response.filter(
      (value) => value.question_id !== ques.question_id
    );
    setResponse(newArray);
    dispatch({
      type: "SET_RESPONSE",
      payload: newArray,
    });
  }

  function handleOptionClick(value) {
    const index = response.findIndex(
      (v) => questionList[currentIndex].question_id === v.question_id
    );
    if (index > -1) {
      // console.log("index is " + index);
      handleClearResponse(questionList[currentIndex]);
    }

    setResponse((prevState) => [
      ...prevState,
      {
        question_id: questionList[currentIndex].question_id,
        qresponse: value,
      },
    ]);
    // refreshMarked(questionList[currentIndex]);
  }
  function refreshMarked(ques) {
    if (marked.includes(ques.question_id)) {
      console.info("yes contains");
      const newArray = marked.filter((value) => value !== ques.question_id);
      dispatch({
        type: "SET_MARKED_QUESTIONS",
        payload: newArray,
      });
    }
  }
  function handleMarkClick(ques) {
    !marked.includes(ques.question_id)
      ? dispatch({
          type: "SET_MARKED_QUESTIONS",
          payload: [...marked, ques.question_id],
        })
      : refreshMarked(ques);
  }
  function CheckAttempted(ques) {
    return (
      response.findIndex((value) => {
        return value.question_id === ques.question_id;
      }) > -1
    );
  }
  function getAttemptedArray() {
    let arr = [];
    response.forEach((item, index) => {
      arr.push(item.question_id);
    });
    return arr;
  }
  function isChecked(Value) {
    if (!CheckAttempted(questionList[currentIndex])) return false;
    else {
      const item = response.find(
        (item) => questionList[currentIndex].question_id === item.question_id
      );
      if (item != null) {
        return Value === item.qresponse;
      }
      return false;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchQuestions = async () => {
    var body = { quiz_name: quiz.quiz_name, quiz_category: quiz.quiz_category };
    var result = await postData("quiz/fetchQuestionByMock", body);
    dispatch({
      type: "SET_QUESTION_LIST",
      payload: result.data,
    });
    // setQuestionList(result.data);
  };

  const calculateCorrect = () => {
    var correct = 0;
    var respArr = [];
    response.map((resp) => {
      let attemptArr = questionList.filter((item) => {
        return item.question_id === resp.question_id;
      });
      respArr.push(attemptArr[0]);
    });
    response.forEach((item, index) => {
      if (item.qresponse === respArr[index].question_correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  useEffect(() => {
    timeme.stopTimer();
    // ... Now might be a good time to upload the time spent on the page to your server!
    // ... load up new page
    timeme.setCurrentPageName((Math.random() + 1).toString(36).substring(7));
    timeme.startTimer();
    return () => {
      sendTimeSpent(timeme.getTimeOnCurrentPageInSeconds());
    };
  }, []);

  const fetchPrevSpentTime = async () => {
    let body = {
      userid: user?.userid,
      pageName: "Mock Tests",
    };
    let response = await postData("user/getPrevSpentTime", body);
    if (response.success) {
      return response.data[0].spent_time || 0;
    }
    return 0;
  };

  const sendTimeSpent = async (time) => {
    let prevTime = (await fetchPrevSpentTime()) || 0;
    let body = {
      userId: user?.userid,
      learningTime: prevTime + time,
      pageName: "Mock Tests",
    };
    await postData("user/insertLearningTime", body);
  };

  const handleQuizEnd = async () => {
    handleClose();
    props.history.replace({ pathname: "/mockresult" }, { quiz });
    dispatch({ type: "RESET_QUIZ" });
    await sendQuiz();
  };

  const sendQuiz = async () => {
    const correct = calculateCorrect();
    let durationInMs = timeme.getTimeOnCurrentPageInSeconds();
    // let finalDuration = new Date(durationInMs).toISOString().slice(11, 19);
    var body = {
      userid: user?.userid,
      mockname: quiz.quiz_name,
      subjectname: quiz.quiz_category,
      totaltime: durationInMs,
      totalquestion: questionList.length,
      totalattempt: response.length,
      totalcorrect: correct,
    };
    var result = await postData("quiz/submitMock", body);
  };

  const [locationKeys, setLocationKeys] = useState([]);
  useEffect(() => {
    let history = props.history;
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event
          const r = window.confirm("Do you want to cancel this quiz?");
          if (r === false) {
            history.push({ pathname: "/mocktest" }, { quiz });
          } else {
            dispatch({ type: "RESET_QUIZ" });
          }
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDialog = () => {
    return (
      <Dialog
        open={open}
        // onClose={handleClose}
        keepMounted
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Submit the test</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Avatar
              style={{
                width: 30,
                height: 30,
                backgroundColor: "green",
                fontSize: 14,
              }}
            >
              {getAttemptedArray().length}
            </Avatar>
            <span>Answered</span>
            <Avatar
              style={{
                width: 30,
                height: 30,
                backgroundColor: "yellow",
                fontSize: 14,
                color: "#000",
              }}
            >
              {marked.length}
            </Avatar>
            <span>Marked</span>
            <Avatar
              style={{
                width: 30,
                height: 30,
                backgroundColor: "grey",
                fontSize: 14,
              }}
            >
              {questionList.length - response.length}
            </Avatar>
            <span>Not Answered</span>
          </div>
          <DialogContentText style={{ marginTop: 20, fontFamily: "Poppins" }}>
            Are you sure you want to end the test ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {quizTimer != "0:0:0" && (
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          )}
          <Button onClick={() => handleQuizEnd()} color="primary">
            End Test
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  document.oncontextmenu = new Function("return false");

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      let charCode = String.fromCharCode(event.which).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === "s") {
        errorMessage("Don't try to copy/paste");
      } else if ((event.ctrlKey || event.metaKey) && charCode === "c") {
        errorMessage("Don't try to copy/paste");
      } else if ((event.ctrlKey || event.metaKey) && charCode === "v") {
        errorMessage("Don't try to copy/paste");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MockHeader
        history={props.history}
        testname={`${quiz.quiz_name} - ${quiz.quiz_category}`}
        initialHour={quizTimer.split(":")[0]}
        initialMinute={quizTimer.split(":")[1]}
        initialSeconds={quizTimer.split(":")[2]}
        onTimeout={() => {
          handleClickOpen();
        }}
      />
      <Grid container>
        <Grid container item xs={9}>
          <Grid item xs={12} style={{ paddingLeft: 20, paddingTop: 20 }}>
            <span>Question No. {currentIndex + 1}. </span>
            <hr />
            <div
              style={{ overflow: "auto" }}
              onSelect={() => {
                return null;
              }}
              onCut={() => {
                return null;
              }}
              onCopy={() => {
                return null;
              }}
              onPaste={() => {
                return null;
              }}
              onDrag={() => {
                return null;
              }}
              onDrop={() => {
                return null;
              }}
            >
              <span>
                {questionList.length > 0 &&
                  parse(questionList[currentIndex].question_text)}
                {/* {questionList.length > 0 && questionList[currentIndex].question_text} */}
              </span>
              {/* {JSON.stringify(response)}  */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
                {questionList.length > 0 &&
                  JSON.parse(questionList[currentIndex].options_array).map(
                    (value, index) => {
                      return (
                        <span
                          htmlFor={`radio${index}`}
                          className="form-check-label"
                          style={{ cursor: "pointer" }}
                        >
                          <Radio
                            checked={isChecked(value)}
                            onChange={() => handleOptionClick(value)}
                            value={value}
                            id={`radio${index}`}
                            // disabled={CheckAttempted(questionList[currentIndex])}
                            name="optradio"
                            inputProps={{ "aria-label": "A" }}
                          />
                          {value}
                        </span>
                      );
                    }
                  )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ position: "fixed", bottom: 0, top: 0 }}>
        <Grid
          item
          xs={9}
          style={{
            display: "flex",
            justifyContent: "stretch",
            alignItems: "flex-end",
          }}
        >
          <footer
            style={{
              // position: "fixed",
              // bottom: 0,
              padding: 10,
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#5E98C250",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              disabled={currentIndex < 1}
              style={{
                color: currentIndex < 1 ? "gray" : "#2A5884",
                borderColor: currentIndex < 1 ? "gray" : "#2A5884",
              }}
              startIcon={<NavigateBefore />}
              onClick={(e) => handleOnCellClick(currentIndex - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={!CheckAttempted(questionList[currentIndex])}
              style={{
                color: !CheckAttempted(questionList[currentIndex])
                  ? "gray"
                  : "#2A5884",
                borderColor: !CheckAttempted(questionList[currentIndex])
                  ? "gray"
                  : "#2A5884",
              }}
              startIcon={<Clear />}
              onClick={(e) => handleClearResponse(questionList[currentIndex])}
            >
              Clear Response
            </Button>
            {!marked.includes(questionList[currentIndex]?.question_id) ? (
              <Button
                variant="outlined"
                color="primary"
                // disabled={CheckAttempted(questionList[currentIndex])}
                style={{
                  color: "#2A5884",
                  borderColor: "#2A5884",
                }}
                startIcon={<TurnedIn />}
                onClick={(e) => handleMarkClick(questionList[currentIndex])}
              >
                Mark Question
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                // disabled={CheckAttempted(questionList[currentIndex])}
                style={{
                  color: "#2A5884",
                  borderColor: "#2A5884",
                }}
                startIcon={<TurnedInNot />}
                onClick={(e) => handleMarkClick(questionList[currentIndex])}
              >
                Unmark Question
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              endIcon={<NavigateNext />}
              disabled={currentIndex >= questionList.length - 1}
              style={{
                color:
                  currentIndex >= questionList.length - 1 ? "gray" : "#2A5884",
                borderColor:
                  currentIndex >= questionList.length - 1 ? "gray" : "#2A5884",
              }}
              onClick={(e) => handleOnCellClick(currentIndex + 1)}
            >
              Save & Next
            </Button>
          </footer>
        </Grid>

        <Grid
          item
          xs={3}
          style={{ backgroundColor: "#2E89A940", paddingTop: 75 }}
        >
          <Grid
            container
            item
            xs={12}
            direction="row"
            alignItems="center"
            style={{ padding: 10, gap: 10 }}
          >
            <Hidden smDown>
              <Avatar
                alt={user?.username}
                style={{ backgroundColor: "darkgreen" }}
              >
                {user?.username.charAt(0)}
              </Avatar>
            </Hidden>
            <span>{user?.username}</span>
          </Grid>
          <Divider />
          <QaList
            questions={questionList}
            attempt={getAttemptedArray()}
            marked={marked}
            rem={questionList.length - response.length}
            onCellClick={(index) => handleOnCellClick(index)}
          />
          <Divider />
          <div
            item
            xs={12}
            style={{
              padding: 9,
              display: "flex",
              justifyContent: "right",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#2A5884" }}
              onClick={() => handleClickOpen()}
            >
              Submit Test
            </Button>
          </div>
        </Grid>
      </Grid>
      {submitDialog()}
    </Suspense>
  );
};
