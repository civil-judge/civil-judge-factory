import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { Suspense, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../redux/reducers/auth";
import { getData, postData } from "../../helpers/FetchApi";
import {
  checkUserPassword,
  errorMessage,
  successMessage,
} from "../../helpers/checks";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper2: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: 0,
    flexDirection: "column",
    "& $h3": {
      marginTop: 0,
      color: "#2a5884",
      padding: 0,
      animation: "fadeInDown 0.45s both",
    },
  },
  input: {
    animation: "fadeInUp 0.45s both",
  },
  button: {
    fontSize: "0.9rem",
    fontFamily: "Poppins",
    backgroundColor: "#2a5884",
    backgroundImage: `linear-gradient(
          -60deg,
          transparent, transparent 40%,
          #ffffff44 40%, #ffffff44 60%,
          transparent 60%, transparent 100%
        )
        `,
    backgroundSize: "200% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "150%",
    "&:hover": {
      backgroundColor: "#2a5884",
      backgroundPositionX: "-150%",
      transition: "background-position-x 600ms",
    },
  },
}));

export const EditProfile = (props) => {
  const classes = useStyles();

  const userDetails = useSelector(getUserDetails);

  const [user, setUser] = useState({});

  const [showPass, setShowPass] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fetchUserProfile = async () => {
    const user = await getData("user/fetchProfile/" + userDetails.userid);
    setUser(user?.data);
    setFirstName(user?.data?.username?.replace(" ", ",").split(",")[0]);
    setLastName(user?.data?.username?.replace(" ", ",").split(",")[1]);
    setPhone(user?.data?.mobileno);
    setEmail(user?.data?.email);
    setGender(user?.data?.gender);
    setAddress(user?.data?.address);
    setPinCode(user?.data?.pincode);
    setCity(user?.data?.city);
    setState(user?.data?.state);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const updateProfile = async () => {
    if (newPassword.length > 0 && !checkUserPassword(newPassword)) {
      return errorMessage(
        "Password should be at least 8 characters long and should contain at least one number and one special character",
        4000
      );
    }
    let body = {
      username: `${firstName} ${lastName}`,
      phone,
      email,
      gender,
      college,
      address,
      pinCode,
      city,
      state,
      currentPassword,
      newPassword,
      userid: user?.userid,
    };
    let result = await postData("user/updateprofile", body);
    if (result.success) {
      if (result.msg == "Incorrect Password") {
        return errorMessage("Incorrect Password");
      }
      successMessage("Profile Updated successfully");
    } else {
      errorMessage("Error in updating profile");
    }
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Paper elevation={0} className={classes.paper2}>
        <h3>Personal Details</h3>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              className={classes.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              className={classes.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                animationDelay: "0.1s",
              }}
              label="Last Name"
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              className={classes.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                animationDelay: "0.2s",
              }}
              label="Mobile Number"
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              className={classes.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                animationDelay: "0.3s",
              }}
              label="Email"
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl
              component="fieldset"
              className={classes.input}
              style={{
                animationDelay: "0.4s",
              }}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender1"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              className={classes.input}
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              style={{
                animationDelay: "0.5s",
              }}
              label="College/University"
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <h3>Your Address</h3>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              className={classes.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                animationDelay: "0.6s",
              }}
              label="Address"
              fullWidth
              size="small"
              variant="filled"
              multiline
              rows={4}
            />
          </Grid>
          <Grid container spacing={0} item xs={12} md={6}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                style={{
                  animationDelay: "0.7s",
                  marginBottom: "0.5rem",
                }}
                fullWidth
                size="small"
                variant="filled"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  animationDelay: "0.8s",
                  paddingRight: "0.5rem",
                }}
                fullWidth
                size="small"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  animationDelay: "0.9s",
                }}
                fullWidth
                size="small"
                variant="filled"
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {showPass ? (
              <TextField
                className={classes.input}
                onChange={(e) => setCurrentPassword(e.target.value)}
                label="Current Password"
                fullWidth
                size="small"
                variant="filled"
                type="password"
              />
            ) : (
              <b
                style={{ cursor: "pointer" }}
                onClick={() => setShowPass(true)}
              >
                Change Password ?
              </b>
            )}
          </Grid>
          <Grid item xs={4}>
            {showPass && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TextField
                  className={classes.input}
                  onChange={(e) => setNewPassword(e.target.value)}
                  label="New Password"
                  fullWidth
                  size="small"
                  variant="filled"
                  type="password"
                />
                <IconButton
                  onClick={() => setShowPass(false)}
                  style={{
                    marginLeft: "0.5rem",
                    backgroundColor: "#2a5884",
                    boxShadow: `0 4px 6px 2px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.24), inset 0 -3px 0 0 rgba(0,0,0,0.12)`,
                    color: "#fff",
                  }}
                >
                  <Close />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item xs={4}>
            <Button
              className={classes.button}
              onClick={() => updateProfile()}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Suspense>
  );
};
