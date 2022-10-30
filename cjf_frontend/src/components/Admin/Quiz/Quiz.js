import React, { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { postData } from "../../../helpers/FetchApi";
import { useDispatch } from "react-redux";
import { emitMockCategoryApi } from "../../../redux/actions/mocks";
import { useSelector } from "react-redux";
import { getMockCategoryData } from "../../../redux/reducers/mocks";
import { FormLabel } from "@mui/material";
import { errorMessage, isDigits, isEmpty, successMessage } from "../../../helpers/checks";
import { KeyboardBackspace } from "@material-ui/icons";
import { DisplayQuiz } from "./DisplayQuiz";

export const Quiz = (props) => {
  const dispatch = useDispatch();

  const [subject, setSubject] = React.useState("");
  const [mockTest, setMockTest] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [status, setStatus] = React.useState("active");
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [remarks, setRemarks] = React.useState("");
  const mockCategory = useSelector(getMockCategoryData);

  const fillMockSubjects = () => {
    return mockCategory?.data.map((item) => {
      return (
        <MenuItem value={item.mocktest_name}>{item.mocktest_name}</MenuItem>
      );
    });
  };

  useEffect(() => {
    dispatch(emitMockCategoryApi());
  }, []);

  const handleSubmit = async () => {
    let err = false;
    if (isEmpty(subject)) {
      err = true;
      errorMessage("Subject Name should not be empty");
    }
    if (isEmpty(mockTest)) {
      err = true;
      errorMessage("Mock Test Name should not be empty");
    }
    if (isEmpty(difficulty)) {
      err = true;
      errorMessage("Difficulty should not be empty");
    }
    if (isEmpty(hours)) {
      err = true;
      errorMessage("Hours should not be empty");
    }
    if (isEmpty(minutes)) {
      err = true;
      errorMessage("Minutes should not be empty");
    }
    if (isEmpty(seconds)) {
      err = true;
      errorMessage("Seconds should not be empty");
    }

    if (!err) {
      let body = {
        quiz_category: subject,
        quiz_name: mockTest,
        quiz_difficulty: difficulty,
        quiz_status: status,
        quiz_duration: `${hours}:${minutes}:${seconds}`,
        quiz_remarks: remarks,
      };
      let result = await postData("quiz/insertMockQuiz", body);
      if (result) {
        successMessage("Quiz Added Successfully");
        setSubject("");
        setMockTest("");
        setDifficulty("");
        setStatus("active");
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setRemarks("");
      } else {
        errorMessage("Something went wrong");
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <IconButton
          onClick={() =>
            props.setComponent(<DisplayQuiz setComponent={props.setComponent} />)
          }
        >
          <KeyboardBackspace />
        </IconButton>
        <h3>Create Mock Test</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select">Subject Name</InputLabel>
            <Select
              labelId="demo-simple-select"
              id="demo-simple-select-outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Select Subject"
            >
              {fillMockSubjects()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={mockTest}
            onChange={(e) => setMockTest(e.target.value)}
            fullWidth
            label="Mock Test Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple">Test Difficulty</InputLabel>
            <Select
              labelId="demo-simple"
              id="demo-simple-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Select Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Mock Test Status</FormLabel>
            <RadioGroup
              row
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="deactive"
                control={<Radio />}
                label="Deactive"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormLabel component="legend">Select Mock Duration</FormLabel>
          <FormControl size="small" variant="outlined" style={{ width:'8.5em', marginTop:15 }}>
            <InputLabel id="hours">
              Hours
            </InputLabel>
            <Select
              labelId="hours"
              id="demo-simple-select-placeholder-label"
              label="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            >
              {
                [...Array(6)].map((item,index) => {
                  return <MenuItem value={index}>{index}</MenuItem>
                })
              }
            </Select>
            
          </FormControl>
          <FormControl size="small" variant="outlined" style={{ marginLeft: 10, width:'8.5em', marginTop:15 }}>
            <InputLabel id="minutes">
              Minutes
            </InputLabel>
            <Select
              labelId="minutes"
              id="demo-simple-select-placeholder"
              label="Minutes"
              defaultValue={0}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {
                [...Array(60)].map((item,index) => {
                  return <MenuItem value={index}>{index}</MenuItem>
                })
              }
            </Select>
            
          </FormControl>
          <FormControl size="small" variant="outlined" style={{ marginLeft: 10, width:'8.5em', marginTop:15 }}>
            <InputLabel id="seconds">
              Seconds
            </InputLabel>
            <Select
              labelId="seconds"
              id="demo-simple-select"
              defaultValue={0}
              label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            >
              {
                [...Array(60)].map((item,index) => {
                  return <MenuItem value={index}>{index}</MenuItem>
                })
              }
            </Select>
            
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            fullWidth
            label="Remarks"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            size="large"
            style={{ backgroundColor: "#1976D2", color: "white" }}
            fullWidth
          >
            Add Mock Test
          </Button>
          {/* <button className={classes.btn}>Add Quiz</button> */}
        </Grid>
      </Grid>
    </Container>
  );
};
