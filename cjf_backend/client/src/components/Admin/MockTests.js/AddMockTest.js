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
import { MocksCategory } from "./Mocks";

export const AddMockTest = (props) => {
  const [mocktestName, setMocktestName] = React.useState("");
  const [mocktestDescription, setMocktestDescription] = React.useState("");
  const [mocktestPrice, setMocktestPrice] = React.useState("");
  const [mocktestOfferPrice, setMocktestOfferPrice] = React.useState("");
  const [mocktestStatus, setMocktestStatus] = React.useState("active");
  const [picture, setPicture] = React.useState({ filename: "", bytes: "" });

  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async () => {
    let err = false;
    if (isEmpty(mocktestName)) {
      err = true;
      errorMessage("Mock Test Name should not be empty");
    }
    if (isEmpty(mocktestPrice)) {
      err = true;
      errorMessage("Mock Test Price should not be empty");
    }
    if (isEmpty(mocktestStatus)) {
      err = true;
      errorMessage("Mock Test Status should not be empty");
    }
    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Course Picture...");
    }
    if (isDigits(mocktestPrice)) {
      err = true;
      errorMessage("Invalid Mock Test Fee");
    }

    if (!err) {
      var formData = new FormData();
      formData.append("mocktest_name", mocktestName);
      formData.append("mocktest_description", mocktestDescription);
      formData.append("mocktest_price", mocktestPrice);
      formData.append("mocktest_offer_price", mocktestOfferPrice);
      formData.append("mocktest_status", mocktestStatus);
      formData.append("mocktest_picture", picture.bytes);

      var result = await postDataAndImage(
        "mocks/insertMocksCategory",
        formData
      );
      if (result) {
        successMessage("Mock Test Added Successfully");
        setMocktestName("");
        setMocktestDescription("");
        setMocktestPrice("");
        setMocktestOfferPrice("");
        setMocktestStatus("active");
        setPicture({ filename: "", bytes: "" });
      } else {
        errorMessage("Something went wrong");
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
            props.setComponent(
              <MocksCategory setComponent={props.setComponent} />
            )
          }
        >
          <KeyboardBackspace />
        </IconButton>
        <h3>Add Mock Tests Subject Category</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            value={mocktestName}
            onChange={(e) => setMocktestName(e.target.value)}
            fullWidth
            label="Mock Test Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={mocktestPrice}
            onChange={(e) => setMocktestPrice(e.target.value)}
            fullWidth
            label="Mock Test Price"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={mocktestOfferPrice}
            onChange={(e) => setMocktestOfferPrice(e.target.value)}
            fullWidth
            label="Mock Test Offer Price"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={mocktestDescription}
            onChange={(e) => setMocktestDescription(e.target.value)}
            fullWidth
            label="Mock Test Desciption"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Mock Test Status</FormLabel>
            <RadioGroup
              row
              value={mocktestStatus}
              onChange={(e) => setMocktestStatus(e.target.value)}
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
              Upload Mock test Picture
            </Button>
          </label>
          <Avatar
            alt="mock test picture"
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
            Add Mock test
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
