import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";
import React from "react";
import {
  errorMessage,
  isDigits,
  isEmpty,
  successMessage,
} from "../../../helpers/checks";
import { postDataAndImage } from "../../../helpers/FetchApi";
import { Courses } from "./Courses";

export const AddCourse = (props) => {
  const [courseName, setCourseName] = React.useState("");
  const [courseCode, setCourseCode] = React.useState("");
  const [courseDescription, setCourseDescription] = React.useState("");
  const [courseDuration, setCourseDuration] = React.useState("");
  const [courseFee, setCourseFee] = React.useState("");
  const [courseOfferFee, setCourseOfferFee] = React.useState("");
  const [courseStatus, setCourseStatus] = React.useState("active");
  const [picture, setPicture] = React.useState({ filename: "", bytes: "" });

  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async () => {
    let err = false;
    if (isEmpty(courseName)) {
      err = true;
      errorMessage("Course Name should not be empty");
    }
    if (isEmpty(courseCode)) {
      err = true;
      errorMessage("Course Code should not be empty");
    }
    if (isEmpty(courseDescription)) {
      err = true;
      errorMessage("Course Description should not be empty");
    }
    if (isEmpty(courseDuration)) {
      err = true;
      errorMessage("Course Duration should not be empty");
    }
    if (isEmpty(courseFee)) {
      err = true;
      errorMessage("Course Fee should not be empty");
    }
    if (isEmpty(courseStatus)) {
      err = true;
      errorMessage("Course Status should not be empty");
    }
    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Course Picture...");
    }
    if (isDigits(courseFee)) {
      err = true;
      errorMessage("Invalid Course Fee");
    }

    if (!err) {
      var formData = new FormData();
      formData.append("course_name", courseName);
      formData.append("course_code", courseCode);
      formData.append("course_description", courseDescription);
      formData.append("course_duration", courseDuration);
      formData.append("course_fee", courseFee);
      formData.append("course_offer_fee", courseOfferFee);
      formData.append("course_picture", picture.bytes);
      formData.append("course_status", courseStatus);

      var result = await postDataAndImage("courses/insertCourse", formData);
      if (result) {
        successMessage("Course Added Successfully...");
        setCourseName("");
        setCourseCode("");
        setCourseDescription("");
        setCourseDuration("");
        setCourseFee("");
        setCourseOfferFee("");
        setCourseStatus("active");
        setPicture({ filename: "", bytes: "" });
      } else {
        errorMessage("Something Went Wrong...");
      }
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
        }}
      >
        <IconButton
          onClick={() =>
            props.setComponent(<Courses setComponent={props.setComponent} />)
          }
        >
          <KeyboardBackspace />
        </IconButton>
        <h3>Add Course</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            fullWidth
            label="Course Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            fullWidth
            label="Course Code"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            fullWidth
            label="Course Description"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            fullWidth
            label="Course Duration (in months)"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
            fullWidth
            label="Course Fees"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={courseOfferFee}
            onChange={(e) => setCourseOfferFee(e.target.value)}
            fullWidth
            label="Course Offer Fees"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Course Status</FormLabel>
            <RadioGroup
              row
              value={courseStatus}
              onChange={(e) => setCourseStatus(e.target.value)}
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
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <input
            accept="image/*"
            // className={classes.input}
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(event) => handlePicture(event)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" color="primary" component="span">
              Upload Course Picture
            </Button>
          </label>
          <Avatar
            alt="course picture"
            src={picture.filename}
            variant="rounded"
            style={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6} />
        <Grid item xs={12} md={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
