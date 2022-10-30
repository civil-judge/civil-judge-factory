import {
  Avatar,
  Badge,
  Divider,
  Grid,
  IconButton,
  Paper,
} from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React, { Suspense, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../redux/reducers/auth";
import { getData, postDataAndImage, ServerURL } from "../../helpers/FetchApi";
import { errorMessage, successMessage } from "../../helpers/checks";
import { EditProfile } from "./EditProfile";
import { LearningSummary } from "./LearningSummary";
import { Acheivements } from "./Acheivements";

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
    "@keyframes fadeInDown": {
      "0%": {
        opacity: 0,
        transform: "translateY(-20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    "@keyframes fade": {
      "0%": { opacity: 0, transform: "translate(30px,-30px)" },
      "100%": { opacity: 1, transform: "translate(0,0)" },
    },
    "@keyframes reverse-fade": {
      "0%": { opacity: 0, transform: "translate(-30px,-30px)" },
      "100%": { opacity: 1, transform: "translate(0,0)" },
    },
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    borderRadius: 0,
    backgroundColor: "#2a5884",
    textAlign: "center",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("xs")]: {
      height: "calc(100vh - 100px)",
    },
  },
  avatar: {
    width: "6rem",
    height: "6rem",
  },
  profileinfo: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
    display: "flex",
    flexDirection: "column",
  },
  checkicon: {
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#2a5884",
    padding: "0.5rem",
    position: "absolute",
    top: "42%",
    left: "10%",
    animation: "fade 0.45s both",
    "&:hover": {
      backgroundColor: "#2a5884",
    },
  },
  cancelicon: {
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.3)",
    backgroundColor: "red",
    padding: "0.5rem",
    position: "absolute",
    top: "42%",
    left: "14%",
    animation: "reverse-fade 0.45s both",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  btn: {
    textTransform: "capitalize",
    cursor: "pointer",
    margin: "0.7rem",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    textAlign: "left",
    fontFamily: "Poppins",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));

export const UserProfile = (props) => {
  const classes = useStyles();

  const userDetails = useSelector(getUserDetails);

  const [user, setUser] = useState({});

  const [picture, setPicture] = useState({
    filename: "",
    bytes: "",
  });
  const [oldPicture, setOldPicture] = useState("");
  const [pictureStatus, setPictureStatus] = useState(false);
  const [view, setView] = useState("profile");

  const handlePicture = (event) => {
    setOldPicture(picture.filename);
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setPictureStatus(true);
  };

  const handleCancelPicture = () => {
    setPicture({ filename: oldPicture, bytes: "" });
    setPictureStatus(false);
  };

  const handleSendPicture = async () => {
    const formData = new FormData();
    formData.append("picture", picture.bytes);
    formData.append("userid", user?.userid);
    let result = await postDataAndImage("user/updateprofilepic", formData);
    setPictureStatus(false);
    if (result) {
      return successMessage("Profile Picture Updated Successfully");
    } else {
      return errorMessage("Something went wrong");
    }
  };

  const fetchUserProfile = async () => {
    const user = await getData("user/fetchProfile/" + userDetails.userid);
    setUser(user?.data);
    setPicture({
      filename: `${ServerURL}/images/${user?.data?.picture}`,
      bytes: "",
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const renderView = () => {
    switch (view) {
      case "acheivement":
        return <Acheivements />;
      case "profile":
        return <EditProfile />;
      case "learning":
        return <LearningSummary userId={user?.userid} />;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid container spacing={0} style={{ marginTop: 100 }}>
        <Grid item sm={3} xs={12} className={classes.grid}>
          <Paper elevation={0} className={classes.paper}>
            <Grid
              container
              spacing={0}
              // style={{ position: "sticky", top: 120 }}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                // item
                xs={12}
              >
                <div className={classes.avatarContainer}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="icon-button-file"
                          type="file"
                          onChange={(event) => handlePicture(event)}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            size="small"
                            style={{
                              backgroundColor: "#fff",
                              padding: "0.5rem",
                            }}
                          >
                            <CameraAltIcon
                              style={{
                                fontSize: "1.2rem",
                                color: "#2a5884",
                                backgroundColor: "#fff",
                                borderRadius: "50%",
                              }}
                            />
                          </IconButton>
                        </label>
                      </>
                    }
                  >
                    <Avatar src={picture.filename} className={classes.avatar} />
                  </Badge>
                  <IconButton
                    color="primary"
                    onClick={() => handleSendPicture()}
                    aria-label="save picture"
                    component="span"
                    size="small"
                    className={classes.checkicon}
                    style={{
                      display: pictureStatus ? "block" : "none",
                    }}
                  >
                    <CheckIcon
                      style={{
                        fontSize: "1.2rem",
                        color: "#fff",
                        backgroundColor: "#2a5884",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="cancel picture"
                    component="span"
                    size="small"
                    className={classes.cancelicon}
                    onClick={() => handleCancelPicture()}
                    style={{
                      display: pictureStatus ? "block" : "none",
                    }}
                  >
                    <CloseIcon
                      style={{
                        fontSize: "1.2rem",
                        color: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                  <p
                    style={{
                      marginBottom: "1rem",
                      color: "#fff",
                      textAlign: "right",
                    }}
                  >
                    {user?.username}
                    <br />
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#ccc",
                      }}
                    >
                      Joined since Oct 2020
                    </span>
                  </p>
                </div>
                <p
                  style={{
                    color: "#fff",
                  }}
                >
                  ITM University, Gwalior
                </p>
              </Grid>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  marginBottom: "2rem",
                }}
              />
              <Grid item xs={12} sm={12}>
                <div
                  onClick={() => setView("acheivement")}
                  className={classes.btn}
                >
                  Your Acheivements
                </div>
                <div onClick={() => setView("profile")} className={classes.btn}>
                  Your Profile
                </div>
                <div
                  onClick={() => setView("learning")}
                  className={classes.btn}
                >
                  Learning Summary
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={9} xs={12} className={classes.grid}>
          {renderView()}
        </Grid>
      </Grid>
    </Suspense>
  );
};
