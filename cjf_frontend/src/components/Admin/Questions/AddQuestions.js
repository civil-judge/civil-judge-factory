import React, { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  IconButton,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { KeyboardBackspace } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { emitMockCategoryApi } from "../../../redux/actions/mocks";
import { getMockCategoryData } from "../../../redux/reducers/mocks";
import { useSelector } from "react-redux";
import { postData } from "../../../helpers/FetchApi";
import { errorMessage, successMessage } from "../../../helpers/checks";
import { Quill } from "../Quill/Quill";
import { DisplayQuestions } from "./DisplayQuestions";

export const AddQuestions = (props) => {
  const dispatch = useDispatch();
  const [showComponent, setShowComponent] = React.useState();
  const subjectCategory = useSelector(getMockCategoryData);
  const [subject, setSubject] = React.useState("");
  const [mockTests, setMockTests] = React.useState([]);
  const [mockName, setMockName] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [type, setType] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [option4, setOption4] = React.useState("");
  const [questionValues, setQuestionValues] = React.useState([]);

  useEffect(() => {
    dispatch(emitMockCategoryApi());
  }, []);

  const handleQuestionChange = () => {
    const answerIndex = [option1, option2, option3, option4].findIndex(
      (option) => answer === option
    );
    let values = {
      question: question,
      answer: answer,
      optionArr:
        type === "bool"
          ? [option1, option2]
          : [option1, option2, option3, option4],
      answerIndex: answerIndex,
      subject: subject,
      mockName: mockName,
      difficulty: difficulty,
      type: type,
    };
    setQuestionValues([...questionValues, values]);
    setQuestion("");
    setAnswer("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
  };

  const fillSubjects = () => {
    return subjectCategory?.data.map((item) => {
      return (
        <MenuItem value={item.mocktest_name}>{item.mocktest_name}</MenuItem>
      );
    });
  };

  const handleSubmit = async () => {
    handleQuestionChange();
    const r = window.confirm("Do you really want to submit the questions ?");
    if (r === true) {
      const answerIndex = [option1, option2, option3, option4].findIndex(
        (option) => answer === option
      );
      let values = {
        question: question,
        answer: answer,
        optionArr:
          type === "bool"
            ? [option1, option2]
            : [option1, option2, option3, option4],
        answerIndex: answerIndex,
        subject: subject,
        mockName: mockName,
        difficulty: difficulty,
        type: type,
      };
      let body = answer === "" ? questionValues : [...questionValues, values];
      let result = await postData("quiz/addQuestion", body);
      if (result) {
        successMessage("Mock Test Added Successfully");
      } else {
        errorMessage("Something went wrong");
      }
    }
  };

  const fetchMockTests = async (value) => {
    setSubject(value);
    let body = { mocktest_subject: value };
    let response = await postData("quiz/fetchAllMockQuizbySubject", body);
    setMockTests(response.data);
  };

  const fillMockTests = () => {
    if (mockTests.length > 0)
      return mockTests?.map((item) => {
        return <MenuItem value={item.quiz_name}>{item.quiz_name}</MenuItem>;
      });
    return (
      <MenuItem value="" disabled>
        No Mock Tests Found
      </MenuItem>
    );
  };

  const MultipleCoice = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} md={12}>
          <Quill
            placeholder="Enter the question text here"
            value={question}
            onChange={(value) => setQuestion(value)}
            style={{ height: "200px", paddingBottom: 45 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            fullWidth
            label="Option 1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            fullWidth
            label="Option 2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            fullWidth
            label="Option 3"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            fullWidth
            label="Option 4"
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <span
            style={{
              width: "12em",
              fontWeight: "bold",
            }}
          >
            Correct Answer :
          </span>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel>Correct Answer</InputLabel>
            <Select
              label="Correct Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {[option1, option2, option3, option4].map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", justifyContent: "right", gap: 10 }}
        >
          <Button
            variant="contained"
            color="primary"
            endIcon={<NavigateNextIcon />}
            onClick={() => handleQuestionChange()}
          >
            Add more
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="secondary"
            endIcon={<SaveIcon />}
          >
            Submit
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const TrueFalse = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} md={12}>
          <Quill
            placeholder="Enter the question text here"
            value={question}
            onChange={(value) => setQuestion(value)}
            style={{ height: "200px", paddingBottom: 45 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{
                fontWeight: "bold",
                fontSize: "1em",
                color: "#000",
              }}
            >
              Correct Answer :
            </FormLabel>
            <RadioGroup
              row
              value={answer}
              onChange={(e) => handleBoolChange(e.target.value)}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="True"
                labelPlacement="start"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="False"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            endIcon={<NavigateNextIcon />}
            onClick={() => handleQuestionChange()}
          >
            Add more
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="secondary"
            endIcon={<SaveIcon />}
          >
            Submit
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const handleBoolChange = (val) => {
    setAnswer(val);
    setOption1("true");
    setOption2("false");
  };

  const handleType = (e) => {
    setShowComponent(e.target.value);
    setType(e.target.value);
  };

  const questionComponent = () => {
    if (
      subject == "" ||
      mockTests.length <= 0 ||
      mockName == "" ||
      difficulty == ""
    ) {
      return <div>Please enter the required fields to enter questions</div>;
    } else if (showComponent === "mcq") {
      return MultipleCoice();
    } else if (showComponent === "bool") {
      return TrueFalse();
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.4em",
        }}
      >
        <KeyboardBackspace
          onClick={() =>
            props.setComponent(
              <DisplayQuestions setComponent={props.setComponent} />
            )
          }
        />
        <span
          style={{
            display: "block",
            fontWeight: "bold",
            fontSize: "1.17em",
          }}
        >
          Add Questions
        </span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple">Subject Name</InputLabel>
            <Select
              labelId="demo-simple"
              label="Select Subject"
              value={subject}
              onChange={(e) => fetchMockTests(e.target.value)}
            >
              {fillSubjects()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl
            size="small"
            fullWidth
            variant="outlined"
            disabled={subject == ""}
          >
            <InputLabel id="demo">Mock Test Name</InputLabel>
            <Select
              labelId="demo"
              label="Mock Test Name"
              value={mockName}
              onChange={(e) => {
                setMockName(e.target.value);
                let data = mockTests.filter((item) => {
                  return item.quiz_name === e.target.value;
                });
                setDifficulty(data[0].quiz_difficulty);
              }}
            >
              {fillMockTests()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <FormControl
            size="small"
            fullWidth
            variant="outlined"
            disabled={subject == "" || mockTests.length <= 0}
          >
            <InputLabel>Select Difficulty</InputLabel>
            <Select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
               <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem> 
              {fillDifficulty()}
            </Select>
          </FormControl> */}
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            disabled
            value={difficulty}
            label="Difficulty"
            type="text"
            placeholder="Difficulty"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <Button variant="contained" fullWidth color="primary">
                Add Questions
            </Button> */}
          <FormControl
            component="fieldset"
            disabled={
              subject == "" ||
              mockTests.length <= 0 ||
              mockName == "" ||
              difficulty == ""
            }
          >
            <FormLabel component="legend">Question Type</FormLabel>
            <RadioGroup row onChange={(e) => handleType(e)} value={type}>
              <FormControlLabel
                value="mcq"
                control={<Radio color="primary" />}
                label="MCQ"
                labelPlacement="start"
              />
              <FormControlLabel
                value="bool"
                control={<Radio color="primary" />}
                label="Boolean"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {questionComponent()}
      </Grid>
    </Container>
  );
};
