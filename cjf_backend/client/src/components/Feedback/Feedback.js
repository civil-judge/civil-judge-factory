import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Lottie from "react-lottie";

import * as animationData from "../../animations/check.json";
import { Rating } from "@mui/material";
import { errorMessage, successMessage } from "../../helpers/checks";
import { postData } from "../../helpers/FetchApi";

export const Feedback = ({ course, mockName, id, fetchReviews }) => {
  const [ratingValue, setRatingValue] = React.useState(0);
  const [ratingLabel, setRatingLabel] = React.useState("");
  const [feedBackText, setFeedBackText] = React.useState("");
  const [feedBackStatus, setFeedBackStatus] = React.useState(false);

  const sendFeedback = async () => {
    let body = {
      userid: id,
      rating: ratingValue,
      feedbacktext: feedBackText,
      subjectname: course,
      mockname: mockName || "",
    };
    let result = await postData("quiz/sendFeedback", body);
    if (result) {
      successMessage("Feedback submitted successfully");
      setFeedBackStatus(true);
      fetchReviews();
    } else {
      errorMessage("Something went wrong");
    }
  };

  const customIcons = {
    1: {
      icon: (
        <SentimentVeryDissatisfiedIcon
          fontSize="large"
          style={{ paddingInline: 5 }}
        />
      ),
      label: "Very Dissatisfied",
    },
    2: {
      icon: (
        <SentimentDissatisfiedIcon
          fontSize="large"
          style={{ paddingInline: 5 }}
        />
      ),
      label: "Dissatisfied",
    },
    3: {
      icon: (
        <SentimentSatisfiedIcon fontSize="large" style={{ paddingInline: 5 }} />
      ),
      label: "Neutral",
    },
    4: {
      icon: (
        <SentimentSatisfiedAltIcon
          fontSize="large"
          style={{ paddingInline: 5 }}
        />
      ),
      label: "Satisfied",
    },
    5: {
      icon: (
        <SentimentVerySatisfiedIcon
          fontSize="large"
          style={{ paddingInline: 5 }}
        />
      ),
      label: "Very Satisfied",
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  if (feedBackStatus) {
    return (
      <div
        style={{
          minHeight: "13vh",
          boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.07)",
          margin: 20,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          options={{
            loop: false,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "none",
            },
          }}
          height={200}
          width={200}
        />
        <Rating
          name="customized-icon"
          value={ratingValue}
          readOnly
          IconContainerComponent={IconContainer}
        />
        {feedBackText.length > 0 && (
          <b style={{ marginTop: 10 }}>"{feedBackText}"</b>
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{
          minHeight: "13vh",
          boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.07)",
          margin: 20,
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontWeight: 600, marginBottom: 10 }}>
          How was your experience ?
        </h3>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          style={{
            fontSize: 14,
            marginBottom: 20,
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          Your feedback will help us improve your test experience
        </Typography>
        <Rating
          name="customized-icons"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
            setRatingLabel(customIcons[`${newValue}`].label);
          }}
          getLabelText={(value) => customIcons[value].label}
          IconContainerComponent={IconContainer}
        />
        {ratingLabel !== -1 && (
          <Box ml={2} p={2}>
            {ratingLabel}
          </Box>
        )}
        <TextField
          onChange={(e) => setFeedBackText(e.target.value)}
          style={{
            width: "60%",
            marginInline: "1.7rem",
          }}
          placeholder="Share your feedback here"
        />
        <Button
          onClick={() => sendFeedback()}
          variant="contained"
          size="large"
          style={{
            backgroundColor: "rgb(42, 88, 132)",
            color: "white",
            fontFamily: "Poppins",
            marginTop: "1.8rem",
            width: 250,
            textTransform: "capitalize",
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
};
