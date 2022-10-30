import { Container, Grid, Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { Suspense, useEffect, useState } from "react";
import { MockCategorySlider } from "../slider/mockCategorySlider";
import { getData, ServerURL } from "../../helpers/FetchApi";
import Aos from "aos";
import "aos/dist/aos.css";

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
    paddingBottom: '2.5rem',
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
    // "&:after": {
    //   content: '""',
    //   position: "absolute",
    //   right: '8rem',
    //   top: "20rem",
    //   borderBottom: "3px solid #2a5884",
    //   height: "3px",
    //   width: "200px",
    // },
  },
}));

export const MocksCategory = (props) => {
  const classes = useStyles();

  const [mocksData, setMocksData] = useState([]);
  const [selected, setSelected] = useState();

  const fetchMocksCategory = async () => {
    let result = await getData("mocks/fetchMocksCategory");
    setMocksData(result?.data);
  }

  useEffect(() => {
    fetchMocksCategory();
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
      {/* <Header history={props.history} /> */}
      <Container style={{ marginTop: 120, paddingInline: 60 }}>
        <Typography variant="h1" className={classes.title2}>
          Mock Tests
        </Typography>
        <Grid
          container
          style={{
            padding: "0px 40px",
          }}
        >
          <blockquote>
            <p className={classes.description}>
              A mock test is a test which is exactly similar to the main exam.
              With our mocks, a student can double their chances in the legal
              competitive exams and make their efforts and hard work fruitful.
              By solving our mock test we give you a perfect idea about the
              final exams. Our mocks help you to analyse yourself and see where
              you stand and how much you can score.
            </p>
          </blockquote>
        </Grid>
        <Container>
          <Grid container spacing={6}>
            {mocksData.map((item, index) => {
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
                    <MockCategorySlider
                      item={item}
                      index={index}
                      selected={selected}
                      history={props.history}
                      picture={`${ServerURL}/images/${item.picture}`}
                      icon={<PersonAdd />}
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
