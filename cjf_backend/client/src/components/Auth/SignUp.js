import React, { Suspense, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Person, Email, Call, VpnKey } from "@material-ui/icons";
import { Header } from "../Header";
import {
  checkUserPassword,
  errorMessage,
  successMessage,
} from "../../helpers/checks";
import { postData } from "../../helpers/FetchApi";

export const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [showPassFeild, setShowPassFeild] = useState(false);
  const [btnState, setBtnState] = useState(true);
  const [agree, setAgree] = useState(false);

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

  const handleOTP = () => {
    if (otp == otpSent) {
      successMessage("OTP verified successfully");
      setShowPassFeild(true);
    } else {
      errorMessage("Invalid OTP");
    }
  };

  const generateOTP = () => {
    let otpval = Math.floor(1000 + Math.random() * 9000);
    successMessage("OTP sent to your mobile number successfully");
    setOtpSent(otpval);
    setOtpStatus(true);
    setResendButtonDisabledTime(30);
    alert(otpval);
  };

  useEffect(() => {
    if (agree) {
      if (
        firstName != "" &&
        lastName != "" &&
        email != "" &&
        password != "" &&
        confirmPassword != "" &&
        phone != "" &&
        otp != ""
      ) {
        if (password == confirmPassword) {
          return setBtnState(false);
        }
      }
    }
    return setBtnState(true);
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    otp,
    agree,
  ]);

  const handleSubmit = async () => {
    if (btnState) {
      return errorMessage("Please fill all the fields and agree to T&C");
    }
    let err = false;
    if (!checkUserPassword(password)) {
      err = true;
      errorMessage(
        "Password should be at least 8 characters long and should contain at least one number and one special character",
        4000
      );
    }
    if (!err) {
      let body = {
        username: firstName + " " + lastName,
        email: email,
        password: password,
        phone: phone.replace(/ /g, ""),
      };
      let result = await postData("user/signup", body);
      if (result) {
        if (result?.msg == "User already exists") {
           errorMessage(
            "User already exists ! Please login with your credentials"
          );
          return props.history.push("/login");
        } else {
          successMessage("Signed Up successfully");
          props.history.push("/login");
        }
      }
      return errorMessage("Something went wrong");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Header history={props.history} /> */}
      <script type="text/javascript" src="/javascript/login.js"></script>
      <link rel="stylesheet" type="text/css" href="/css/login.css" />
      <div style={{ marginTop: 110 }}>
        <div className="container">
          <div className="img">
            <img src="/images/bg3.png" width="90%"/>
          </div>
          <div className="login-content">
            <h2>Welcome !</h2>
            <sub style={{ fontSize: 10 }}>
              Please fill all the fields and verify your mobile number to create
              an account.
            </sub>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  autoFocus
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  label="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  label="Mobile No."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Call fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {phone.length >= 10 &&
                          (otpStatus ? (
                            <Button
                              onClick={() => generateOTP()}
                              size="small"
                              color="primary"
                              disabled={resendButtonDisabledTime > 0}
                              style={{
                                color:
                                  resendButtonDisabledTime > 0
                                    ? "gray"
                                    : "#2a5884",
                                textTransform: "none",
                              }}
                            >
                              {resendButtonDisabledTime > 0
                                ? `Resend OTP in ${resendButtonDisabledTime} sec`
                                : `Resend OTP`}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => generateOTP()}
                              size="small"
                              color="primary"
                              style={{ color: "#2a5884" }}
                            >
                              Send OTP
                            </Button>
                          ))}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid container item xs={4} alignItems='center'>
            <Button
                fullWidth
                variant="contained"
                size="medium"
                color="primary"
                style={{ backgroundColor: "#2a5884" }}
                >
                    Verify
            </Button>
          </Grid> */}
              {showPassFeild ? (
                <>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      required
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKey fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      required
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKey fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    required
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {otp.length > 0 && (
                            <Button
                              onClick={() => handleOTP()}
                              size="small"
                              color="primary"
                              style={{ color: "#2a5884" }}
                            >
                              Verify
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Checkbox
                  checked={agree}
                  onChange={() => setAgree((prev) => !prev)}
                  style={{
                    color: "#2a5884",
                    padding: 0,
                    margin: 0,
                  }}
                />
                <span style={{ fontSize: 14, marginLeft: 10 }}>
                  By creating an account, you agree to our Terms and Conditions
                </span>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleSubmit()}
                  style={{
                    backgroundColor: btnState ? "gray" : "#2a5884",
                    width: 250,
                    marginTop: 0,
                    color: "#fff",
                    boxShadow: [
                      "0px 3.4px 2.7px rgba(0, 0, 0, 0.022)",
                      "0px 8.7px 6.9px rgba(0, 0, 0, 0.031)",
                      "0px 17.7px 14.2px rgba(0, 0, 0, 0.039)",
                      "0px 36.5px 29.2px rgba(0, 0, 0, 0.048)",
                      "0px 100px 80px rgba(0, 0, 0, 0.07)",
                    ],
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                // style={{
                //   marginTop: 10,
                // }}
              >
                <span
                  onClick={() => props.history.push("/login")}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Have an account? Sign In!
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
