import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "@keyframes fadeInUp": {
      "0%": {
        opacity: 0,
        transform: "translateY(20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },
  root: {
    flex: 1,
    height: "100vh",
    // backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1890&q=80)`,
    // background: "rgb(2,0,36)",
    // background:
    //   "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(42,88,132,1) 66%, rgba(0,212,255,1) 100%)",
  },
  video: {
    position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%",
    filter: "blur(8px)",
  },
  contentContainer: {
    background: "#2a588470",
    height: "100%",
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "5rem",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
  },
  comingsoon: {
    fontSize: "2.5rem",
    fontWeight: "700",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    color: "#fff",
    marginTop: "1rem",
    textTransform: "uppercase",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
  },
  timerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontFamily: "Poppins",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    fontSize: "5rem",
    gap: "1rem",
    color: "#fff",
    lineHeight: "6.5rem",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
  },
  time: {
    fontSize: "5rem",
    fontWeight: "600",
    // filter: "drop-shadow(1px 1px 0.5px #000)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: 400,
    lineHeight: "1.5rem",
  },
  intro: {
    width: "60%",
    textAlign: "center",
    color: "#fff",
    margin: "1rem",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
  },
  social: {
    color: "#fff",
    display: "flex",
    gap: "1rem",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
    "& $i": {
      height: "40px",
      color: "#fff",
      width: "40px",
      textAlign: "center",
      lineHeight: "38px",
      borderRadius: "50%",
      transition: "0.4s ease-in-out",
    },
  },
  daysContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    filter: "drop-shadow(1px 1px 0.5px #000)",
    color: "#fff",
    gap: "1rem",
    lineHeight: "6rem",
    transition: "0.4s ease-in-out",
    animation: "fadeInUp 0.45s both",
  },
  days: {
    fontSize: "5rem",
    fontWeight: 700,
  },
  dayText: {
    fontSize: "1.5rem",
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

export const ComingSoonPage = () => {
  const [days, setDays] = React.useState("00");
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("00");
  const [comingDate, setComingDate] = React.useState(
    new Date("Dec 8, 2022 00:00:00")
  );

  function getTrueNumber(x) {
    if (x < 10) return "0" + x;
    else return x;
  }

  useEffect(() => {
    let x = setInterval(function () {
      let now = new Date();
      let selisih = comingDate.getTime() - now.getTime();

      let days = Math.floor(selisih / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((selisih % (1000 * 60)) / 1000);

      setDays(getTrueNumber(days));
      setHours(getTrueNumber(hours));
      setMinutes(getTrueNumber(minutes));
      setSeconds(getTrueNumber(seconds));

      if (selisih < 0) {
        clearInterval(x);
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
      }
    }, 1000);
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <video
        className={classes.video}
        width="100%"
        // height="100%"
        autoPlay
        muted
        loop
      >
        <source src="/images/cjfcomingsoon.mp4" type="video/mp4" />
      </video>
      <div className={classes.contentContainer}>
        <img src="/images/02.png" alt="logo" className={classes.logo} />
        <div
          className={classes.comingsoon}
          style={{
            animationDelay: "0.1s",
          }}
        >
          Coming Soon
        </div>
        <div
          className={classes.daysContainer}
          style={{
            animationDelay: "0.2s",
          }}
        >
          <div className={classes.days}>
            <span>{days}</span>
          </div>
          <span className={classes.dayText}>days</span>
        </div>
        <div
          className={classes.timerContainer}
          style={{
            animationDelay: "0.3s",
          }}
        >
          <div className={classes.time}>
            <span>{hours}</span>
            <span className={classes.timeText}>hours</span>
          </div>
          <span>:</span>
          <div className={classes.time}>
            <span>{minutes}</span>
            <span className={classes.timeText}>minutes</span>
          </div>
          <span>:</span>
          <div className={classes.time}>
            <span>{seconds}</span>
            <span className={classes.timeText}>seconds</span>
          </div>
        </div>
        <p
          className={classes.intro}
          style={{
            animationDelay: "0.4s",
          }}
        >
          This platform has been created with an intention to provide people
          from law field with a single destination to all there needs. By taking
          our specialized courses we make sure that the aspirants are now ready
          to take on anything.
        </p>
        <div
          className={classes.social}
          style={{
            animationDelay: "0.5s",
          }}
        >
          <a
            rel="noreferrer"
            href="https://facebook.com/theciviljudgefactory"
            target="_blank"
          >
            <i className="fa fa-facebook-f facebook-bg"></i>
          </a>
          <a
            rel="noreferrer"
            href="https://twitter.com/Team_CJF"
            target="_blank"
          >
            <i className="fa fa-twitter twitter-bg"></i>
          </a>
          <a
            rel="noreferrer"
            href="https://instagram.com/the_civiljudge_factory/"
            target="_blank"
          >
            <i className="fa fa-instagram google-bg"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
