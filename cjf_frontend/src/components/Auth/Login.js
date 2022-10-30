import React, { Suspense, useEffect, useState } from "react";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { AccountCircle, Smartphone, VpnKey } from "@material-ui/icons";
import { errorMessage, successMessage } from "../../helpers/checks";
import { postData } from "../../helpers/FetchApi";
import { Header } from "../Header";
import { useDispatch } from "react-redux";

export const Login = (props) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [emailView, setEmailView] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(0);
  let resendOtpTimerInterval;
  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const resendOTP = () => {
    setResendButtonDisabledTime(30);
    generateOTP();
  };

  const handleOTP = () => {
    if (otp == otpSent) {
      successMessage("OTP verified successfully");
      dispatch({
        type: "USER_LOGIN",
        payload: userDetails,
      });
      props.history.push("/");
    } else {
      errorMessage("Invalid OTP");
    }
  };

  const generateOTP = async() => {
    let body = { phone };
    let result = await postData("user/checkuser", body);
    if (result.msg)
    {
      let otpval = Math.floor(1000 + Math.random() * 9000);
      successMessage("OTP sent to your mobile number successfully");
      setOtpSent(otpval);
      setOtpStatus(true);
      setResendButtonDisabledTime(30);
      alert(otpval);
      setUserDetails(result.data[0]);
    }
    else
    {
      errorMessage("Please signup before login");
      props.history.push("/signup");
    }
  };

  const passwordLogin = async () => {
    let body = { email, password };
    let result = await postData("user/login", body);
    if (result) {
      if (result.msg == "failure") {
        return errorMessage("Invalid email or password");
      }
      if (result.msg == "Invalid password") {
        return errorMessage("Invalid password");
      }
      if (result.msg == "success") {
        successMessage("Login Successful");
        setUserDetails(result.data[0]);
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
        props.history.push("/");
      }
    } else {
      return errorMessage("Something went wrong");
    }
  };

  const EmailLogin = () => {
    return (
      <div className="login-content">
        <h1>Login</h1>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              required
              autoFocus
              label="Email"
              placeholder="Ex: youremail@xyzmail.com"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              style={{
                borderRadius: 20,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              required
              placeholder="Your Account Password"
              label="Password"
              autoComplete="current-password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginTop: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Forgot Password ?
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setEmailView(false)}
            >
              Login with OTP
            </span>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => passwordLogin()}
              variant="contained"
              size="large"
              color="primary"
              style={{
                backgroundColor: "#2a5884",
                width: 250,
                marginTop: 20,
                fontFamily: "Poppins",
                boxShadow: [
                  "0px 3.4px 2.7px rgba(0, 0, 0, 0.022)",
                  "0px 8.7px 6.9px rgba(0, 0, 0, 0.031)",
                  "0px 17.7px 14.2px rgba(0, 0, 0, 0.039)",
                  "0px 36.5px 29.2px rgba(0, 0, 0, 0.048)",
                  "0px 100px 80px rgba(0, 0, 0, 0.07)",
                ],
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 10,
            }}
          >
            <span
              onClick={() => props.history.push("/signup")}
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Don't have an account? Sign Up!
            </span>
            <div style={{
              width: "2.2rem",
              marginTop: '0.8rem',
              display: 'flex',
              flexDirection: 'row',
              gap:'1.5rem'
            }}>
            <img src="/images/google.png" width="100%" />
            <img src="/images/facebook.png" width="105%" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const OtpLogin = () => {
    return (
      <div className="login-content">
        <h1>Login</h1>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              required
              autoFocus
              label="Mobile No."
              placeholder="Ex: 987xxxx321"
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={(event) => event.key === 'Enter' ? generateOTP() : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Smartphone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            {otpStatus ? (
              <TextField
                fullWidth
                variant="outlined"
                required
                autoFocus
                placeholder="OTP"
                label="OTP"
                onKeyPress={(event) => event.key === 'Enter' ? handleOTP() : null}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  marginTop: 5,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Button
                onClick={() => generateOTP()}
                variant={phone.length >= 10 ? 'contained' : "outlined"}
                disabled={phone.length >= 10 ? false : true}
                fullWidth
                size="large"
                color="primary"
                style={{
                  backgroundColor: phone.length >= 10 ? "#2a5884" : "",
                  border: 'none',
                  padding: "15px 0",
                  fontFamily: "Poppins",
                  boxShadow: [
                    "0px 3.4px 2.7px rgba(0, 0, 0, 0.022)",
                    "0px 8.7px 6.9px rgba(0, 0, 0, 0.031)",
                    "0px 17.7px 14.2px rgba(0, 0, 0, 0.039)",
                    "0px 36.5px 29.2px rgba(0, 0, 0, 0.048)",
                    "0px 100px 80px rgba(0, 0, 0, 0.07)",
                  ],
                }}
              >
                Send OTP
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {
              otpStatus ? <span
              onClick={() => resendOTP()}
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                color: resendButtonDisabledTime > 0 ? "#999" : "#000",
              }}
            >
              {resendButtonDisabledTime > 0
                ? `Resend OTP in ${resendButtonDisabledTime} sec`
                : `Resend OTP`}
            </span>
            :
            <span></span>
            }
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setEmailView(true)}
            >
              Login with Email/Password
            </span>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => handleOTP()}
              variant="contained"
              size="large"
              color="primary"
              style={{
                backgroundColor: "#2a5884",
                width: 250,
                marginTop: 20,
                fontFamily: "Poppins",
                boxShadow: [
                  "0px 3.4px 2.7px rgba(0, 0, 0, 0.022)",
                  "0px 8.7px 6.9px rgba(0, 0, 0, 0.031)",
                  "0px 17.7px 14.2px rgba(0, 0, 0, 0.039)",
                  "0px 36.5px 29.2px rgba(0, 0, 0, 0.048)",
                  "0px 100px 80px rgba(0, 0, 0, 0.07)",
                ],
              }}
            >
              Login with OTP
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 10,
            }}
          >
            <span
              onClick={() => props.history.push("/signup")}
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Don't have an account? Sign Up!
            </span>
            <div style={{
              width: "2.2rem",
              marginTop: '0.8rem',
              display: 'flex',
              flexDirection: 'row',
              gap:'1.5rem'
            }}>
            <img src="/images/google.png" width="100%" />
            <img src="/images/facebook.png" width="105%" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Header history={props.history} /> */}
      <link rel="stylesheet" type="text/css" href="/css/login.css" />
      <div style={{ marginTop: 120 }}>
        {/* <img className="wave" src="/images/wave.png" /> */}
        <div className="container">
          <div className="img">
            <img src="/images/bg3.png" width="90%"/>
          </div>
          {emailView ? EmailLogin() : OtpLogin()}
        </div>
      </div>
    </Suspense>
  );
};
