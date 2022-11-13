import React, { Suspense, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SliderCard from "./Card";
import "./slider.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  sliderItem: {
    width: "100%",
    height: "12rem",
    paddingInline: "0.3rem",
    border: "none",
    outline: "none",
    // borderRadius: 10
  },
  card: {
    display: "flex",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingInline: "1rem",
    "& $h2": {
      color: "#2a5884",
      fontSize: 24,
    },
  },
  ViewAll: {
    // color: "#2a5884",
    fontSize: 16,
    fontWeight: 600,
    background: "none",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    "&:hover": {
      background: "none",
    },
  },
}));

export const SliderComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const ads = props.type == "ads" ? true : false;

  const onClickAction = (item) => {
    switch (props.type) {
      case "ads":
        return; // history.push(`/ads/${item.id}`);
      case "notes":
        return;
      case "courses":
        return history.push(
          {
            pathname: `/courses/course-content/${item.course_id}`,
          },
          {
            item: item,
          }
        );
      case "mocks":
        return history.push({ pathname: "/mocklist" }, { item });
      case "books":
        return;
      case "accessories":
        return;
      default:
        return; // history.push(`/course/${item.id}`);
    }
  };

  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIos style={{ color: "black", fontSize: "30px" }} />
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIos style={{ color: "black", fontSize: "30px" }} />
      </div>
    );
  };

  useEffect(() => {
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

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: !ads ? 4 : 3,
    slidesToScroll: 1,
    speed: 400,
    arrows: !ads,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  if (!props.show) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {props.title && (
        <div className={classes.title}>
          <h2>{props.title}</h2>
          {matches ? (
            <IconButton
              onClick={() =>
                history.push(`/${props.title.replace(" ", "").toLowerCase()}`)
              }
              size="medium"
            >
              <ChevronRightIcon
                style={{ color: "#2a5884", fontSize: "30px" }}
              />
            </IconButton>
          ) : (
            <Typography
              onClick={() =>
                history.push(`/${props.title.replace(" ", "").toLowerCase()}`)
              }
              component={Button}
              disableRipple
              endIcon={<ChevronRightIcon />}
              className={classes.ViewAll}
            >
              View All
            </Typography>
          )}
        </div>
      )}
      <div
        className="carousel"
        style={{
          paddingInline: ads && 0,
          width: "99.5vw",
          marginInlineStart: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {props?.loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: ads ? 12 : 25,
            }}
          >
            <Skeleton
              sx={{ borderRadius: !ads && "0.5rem" }}
              animation="wave"
              variant="rectangular"
              width={ads ? "27rem" : "20rem"}
              height={ads ? "11rem" : "18rem"}
            />
            <Skeleton
              sx={{ borderRadius: !ads && "0.5rem" }}
              animation="wave"
              variant="rectangular"
              width={ads ? "27rem" : "20rem"}
              height={ads ? "11rem" : "18rem"}
            />
            <Skeleton
              sx={{ borderRadius: !ads && "0.5rem" }}
              animation="wave"
              variant="rectangular"
              width={ads ? "27rem" : "20rem"}
              height={ads ? "11rem" : "18rem"}
            />
            {!ads && (
              <Skeleton
                sx={{ borderRadius: "0.5rem" }}
                animation="wave"
                variant="rectangular"
                width="20rem"
                height="18rem"
              />
            )}
          </div>
        ) : (
          <Slider {...settings}>
            {props?.data.map((item, index) => {
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className={classes.card}
                >
                  {props.type == "ads" ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={classes.sliderItem}
                    />
                  ) : (
                    <SliderCard
                      item={item}
                      onClick={() => onClickAction(item)}
                      isLocked={props.isLocked}
                    />
                  )}
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </Suspense>
  );
};
