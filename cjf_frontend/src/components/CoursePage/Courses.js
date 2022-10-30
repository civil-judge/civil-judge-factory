import React, { Suspense, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";

import { getData, ServerURL } from "../../helpers/FetchApi";
import { CourseComponent } from "./CourseComponent";

const useStyles = makeStyles((theme) => ({
  title2: {
    width: "100%",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Poppins",
    color: "#5e98c2",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    fontWeight: 600,
  },
  description: {
    textAlign: "center",
    fontFamily: "Poppins",
    paddingBottom: "2.5rem",
    paddingInline: 30,
    borderBottom: "3px solid #5e98c2",
    "&:before": {
      position: "absolute",
      fontFamily: "'FontAwesome'",
      top: "7rem",
      content: '"\\f10d"',
      fontSize: "120px",
      color: "rgba(0,0,0,0.1)",
    },
  },
  
}));

export const CoursePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState();

  const fetchCourses = async () => {
    let list = await getData("courses/fetchActiveCourses");
    setCourses(list.data);
  };

  useEffect(() => {
    fetchCourses();
    Aos.init({
      // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      disable: false,
      // name of the event dispatched on the document, that AOS should initialize on
      startEvent: "DOMContentLoaded",
      // class applied after initialization
      initClassName: "aos-init",
      // class applied on animation
      animatedClassName: "aos-animate",
      // if true, will add content of `data-aos` as classes on scroll
      useClassNames: false,
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container style={{ marginTop: 120 }}>
        <Typography variant="h1" className={classes.title2}>
          Courses
        </Typography>
        <Grid
          container
          style={{
            padding: "0px 40px",
          }}
        >
          <blockquote>
            <p className={classes.description}>
              Through our systematically structured courses, learners can
              enhance their basic fundamental concepts, structure and sequences
              of law. We offer a wide range of law courses that makes the law
              accessible to the students as well as the Aspirants. We have
              developed legal courses that allow young adults to learn the core
              legal skills and improve their proficiency. Our courses are
              developed by legal experts and teachers who are skilled in the
              field. Our courses are duly enhanced and our approach is fresh. As
              our every course is relevant to the current climate and is
              relentlessly focused on what you can do, not just what you know.
              So by taking our courses we make sure that the students are ready
              to take on anything.
            </p>
          </blockquote>
        </Grid>
        <Container>
          <Grid container spacing={4}>
            {courses.map((item, index) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    onMouseOver={() => setSelected(index)}
                    onMouseLeave={() => setSelected(null)}
                    style={{
                      boxShadow: [
                        "0px 5.1px 2.2px rgba(0, 0, 0, 0.02)",
                        "0px 12.4px 5.3px rgba(0, 0, 0, 0.028)",
                        "0px 23.3px 10px rgba(0, 0, 0, 0.035)",
                        "0px 41.5px 17.9px rgba(0, 0, 0, 0.042)",
                        "0px 77.7px 33.4px rgba(0, 0, 0, 0.05)",
                        "0px 186px 80px rgba(0, 0, 0, 0.07)",
                      ],
                      borderRadius: "0.5rem",
                    }}
                  >
                    <CourseComponent
                      item={item}
                      index={index}
                      selected={selected}
                      history={props.history}
                      picture={`${ServerURL}/images/${item.picture}`}
                      icon={<PersonAdd />}
                      onClick={() =>
                        props.history.push(
                          {
                            pathname: `/courses/course-content/${item.course_id}`,
                          },
                          {
                            item,
                          }
                        )
                      }
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </Suspense>
  );
};
