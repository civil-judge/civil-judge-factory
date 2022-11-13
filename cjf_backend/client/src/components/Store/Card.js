import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Box, CardActionArea } from "@material-ui/core";
import { Lock } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    margin: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-9px -1px 30px -22px black",
    transition: "0.3s all",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 0,
    paddingTop: "0%",
    paddingBottom: "50%",
    transition: "0.3s all",
    // "&:hover": {
    //   transform: "scale(1.1)",
    // },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  dropshadow: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    transition: "0.4s ease",
    borderRadius: "0.5rem 0.5rem 0 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  boxIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "16px",
    fontFamily: "Poppins",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  description: {
    fontFamily: "Poppins",
    fontSize: "12px",
    color: "#9E9E9E",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    lineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  price: {
    fontSize: "1.8rem",
    margin: 0,
    padding: 0,
    fontWeight: 700,
    color: "#2a5884",
    // filter: "drop-shadow(0.5px 1px 0.5px #2a5884)",
    fontFamily: "Poppins",
  },
  detailsWrapper: {
    backgroundColor: "#2e89a9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  details: {
    // borderRight: "1px solid #5e98c2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0.8rem",
  },
  detailsTitle: {
    fontSize: "1.5rem",
    color: "#fff",
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 1,
  },
  detailsSubtitle: {
    textAlign: "center",
    color: "#fff",
    padding: "0.2rem",
    textTransform: "uppercase",
    font: "0.5rem Poppins",
  },
}));

export default function SliderCard(props) {
  const classes = useStyles();

  const { name, image, price, description, extraData } = props.item;
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            width: "100%",
            height: "12rem",
          }}
          onClick={props.onClick}
        ></div>
        {props.isLocked && (
          <div
            style={{
              height: "100%",
              opacity: 1,
            }}
            className={classes.dropshadow}
          >
            <div className={classes.boxIcon}>
              <Lock style={{ color: "#FFF", fontSize: "4.5rem" }} />
            </div>
          </div>
        )}
        <Box
          p={2}
          onClick={props.onClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <Typography className={classes.title}>{name}</Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <p className={classes.description}>{description}</p>
          </div>
          <div>
            <Typography variant="h2" gutterBottom className={classes.price}>
              {price}
            </Typography>
          </div>
        </Box>
        <div onClick={props.onClick} className={classes.detailsWrapper}>
          {extraData.map((item, index) => {
            return (
              <div
                className={classes.details}
                style={{
                  borderRight:
                    index === extraData.length - 1
                      ? "none"
                      : "1px solid #5e98c2",
                }}
              >
                <div className={classes.detailsTitle}>{item.count}</div>
                <div className={classes.detailsSubtitle}>{item.title}</div>
              </div>
            );
          })}
        </div>
      </CardActionArea>
    </Card>
  );
}
