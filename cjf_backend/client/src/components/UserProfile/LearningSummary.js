import React, { useEffect, useState } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import LineChart from "../Charts/LineChart";
import { postData } from "../../helpers/FetchApi";

const useStyles = makeStyles((theme) => ({
  paper2: {
    flexGrow: 1,
    paddingInline: theme.spacing(2),
    borderRadius: 0,
    flexDirection: "column",
    // backgroundColor: "#dddddd50",
    "& $h3": {
      margin: 0,
      color: "#2a5884",
      paddingInline: "1em",
      paddingBottom: "1em",
      animation: "fadeInDown 0.45s both",
    },
  },
  summaryCard: {
    borderRadius: "1rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.07)",
    width: "30%",
    // margin: '1rem'
  },
  summaryStat: {
    fontSize: "2.5rem",
    color: "#2a5884",
    fontWeight: 700,
    lineHeight: "1em",
    // padding: "0 1rem",
  },
  summaryText: {
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "uppercase",
    // paddingLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

export const LearningSummary = (props) => {
  const classes = useStyles();

  const [seriesData, setSeriesData] = useState([]);
  const [xAxisLabels, setXAxisLabels] = useState([]);

  const fetchChartData = async () => {
    let body = {
      userId: props?.userId,
    };
    let response = await postData("user/getLearningData", body);
    if (response.success) {
      setSeriesData(response.data);
      setXAxisLabels(response.labels);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <Paper elevation={0} className={classes.paper2}>
      <h3>Learning Summary</h3>
      <Grid
        container
        style={{
          paddingInline: "1rem",
        }}
      >
        <div
          item
          xs={12}
          md={4}
          className={classes.summaryCard}
          style={{
            marginRight: "1rem",
          }}
        >
          <img src="/images/lessons.svg" width="50px" />
          <span className={classes.summaryText}>
            <span className={classes.summaryStat}>3</span>
            Completed Courses
          </span>
        </div>
        <div
          item
          xs={12}
          md={4}
          className={classes.summaryCard}
          style={{
            marginRight: "1rem",
          }}
        >
          <img src="/images/mocks.svg" width="50px" />
          <span className={classes.summaryText}>
            <span className={classes.summaryStat}>4</span>
            Completed Mocks
          </span>
        </div>
        <div
          item
          xs={12}
          md={4}
          className={classes.summaryCard}
          style={{
            marginRight: "1rem",
          }}
        >
          <img src="/images/play.svg" width="50px" />
          <span className={classes.summaryText}>
            <span className={classes.summaryStat}>135</span>
            Total Watch Time(mins.)
          </span>
        </div>
      </Grid>
      <div
        style={{
          marginTop: "1.5rem",
          paddingInline: "1rem",
        }}
      >
        <LineChart
          title="Total Learning Hours"
          seriesData={seriesData}
          yAxisName="Number of Hours Spent"
          xAxisLabels={xAxisLabels}
          legend={["Courses", "Mock Tests"]}
        />
      </div>
    </Paper>
  );
};
