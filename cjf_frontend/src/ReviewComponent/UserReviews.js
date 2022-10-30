import { Container, Grid, Typography } from "@material-ui/core";
import React, { Suspense } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Rating } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  grid: {
    padding: theme.spacing(2),
    // border: "1px solid #ccc",
    // borderRadius: "0.5rem",
  },
  feedbackText: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#000",
    fontFamily: "Poppins",
    margin: 0,
    padding: 0,
    // marginBottom: "1rem",
  },
  date: {
    fontSize: "0.8rem",
    color: "#999",
  },
  name: {
    fontSize: "0.8rem",
    // color: "#2a5884",
  },
}));

export const UserReviews = ({ review }) => {
  const classes = useStyles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          className={classes.root}
        >
          <Grid item md={10} xs={12} className={classes.grid}>
            <Rating
              size="small"
              name="read-only"
              emptyIcon={<></>}
              value={review.rating}
              readOnly
            />
            <Typography
              className={classes.feedbackText}
              variant="h6"
              gutterBottom
            >
              {review.feedbacktext}
            </Typography>

            <span className={classes.name}>Nitin Verma</span>
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
            style={{ float: "right", textAlign: "right" }}
            className={classes.date}
          >
            <span>{review.created_on.split("T")[0].replace(/-/g, "/")}</span>
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};
