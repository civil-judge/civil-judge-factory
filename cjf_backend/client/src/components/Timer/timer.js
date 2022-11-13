import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Timer = (props) => {
  const dispatch = useDispatch();
  const {
    initialHour = 0,
    initialMinute = 0,
    initialSeconds = 0,
    onTimeout,
    onCloseTime,
  } = props;
  const [hour, setHour] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (hour == 0 && minutes == 0 && seconds == 0) {
      onTimeout();
    }
  }, [hour, minutes, seconds]);

  useEffect(() => {
    dispatch({
      type: "SET_QUIZ_TIMER",
      payload: `${hour}:${minutes}:${seconds}`,
    });

    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        if (hour == 0 && minutes == 2 && seconds == 0) {
          onCloseTime();
        }
        if (minutes == 0) {
          if (hour == 0) {
            clearInterval(myInterval);
          } else {
            setHour(hour - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  function getElement() {
    if (hour == 0 && minutes == 0 && seconds == 0) {
      return <b>Timeout</b>;
    } else {
      return (
        <b
          style={{
            color: "black",
          }}
        >
          {hour < 10 ? `0${hour}` : hour} :{" "}
          {minutes < 10 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </b>
      );
    }
  }

  return <div>{getElement()}</div>;
};

export default Timer;
