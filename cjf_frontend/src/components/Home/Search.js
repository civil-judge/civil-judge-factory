import { alpha, InputBase, makeStyles } from "@material-ui/core";
import { SearchSharp } from "@material-ui/icons";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getData, ServerURL } from "../../helpers/FetchApi";
import { randomColor } from "../../helpers/randomColor";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    border: "1px solid #99999950",
    boxShadow: [
      "0px 3.4px 2.7px rgba(0, 0, 0, 0.022)",
      "0px 8.7px 6.9px rgba(0, 0, 0, 0.031)",
      "0px 17.7px 14.2px rgba(0, 0, 0, 0.039)",
      "0px 36.5px 29.2px rgba(0, 0, 0, 0.048)",
      "0px 100px 80px rgba(0, 0, 0, 0.07)",
    ],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    fontFamily: "Poppins",
  },
  inputInput: {
    padding: theme.spacing(2.5, 2.5, 2.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  box: {
    width: "15rem",
    height: "15rem",
    margin: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginTop: 30,
    gap: 10,
    flexWrap: "wrap",
  },
  boxText: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "center",
  },
}));

export const Search = () => {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = courses.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(courses);
    }
  };

  const fetchCourses = async () => {
    let result = await getData("courses/fetchActiveCourses");
    setCourses(result?.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          style={{ fontWeight: 700, fontFamily: "Poppins", paddingBottom: 20 }}
        >
          Choose your goal
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchSharp />
          </div>
          <InputBase
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search for your goal"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.boxContainer}>
          {searchInput.length > 1
            ? filteredResults.map((course, index) => {
                return (
                  <div
                    className={classes.box}
                    //   style={{ backgroundImage: `url(${ServerURL}/images/${course.picture})`,
                    //  backgroundSize: 'contain' }}
                    key={index}
                  >
                    <img
                      src={`${ServerURL}/images/${course.picture}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                    {/* <div className={classes.boxText}>{course.course_name}</div> */}
                  </div>
                );
              })
            : courses.map((course, index) => {
                return (
                  <div
                    className={classes.box}
                    //   style={{ backgroundImage: `url(${ServerURL}/images/${course.picture})`,
                    //  backgroundSize: 'contain' }}
                    key={index}
                  >
                    <img
                      src={`${ServerURL}/images/${course.picture}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                    {/* <div className={classes.boxText}>{course.course_name}</div> */}
                  </div>
                );
              })}
        </div>
      </Container>
    </div>
  );
};
