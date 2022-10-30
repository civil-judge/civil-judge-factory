import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import {
  errorMessage,
  isDigits,
  isEmpty,
  successMessage,
} from "../../../helpers/checks";
import {
  getData,
  postData,
  postDataAndImage,
  ServerURL,
} from "../../../helpers/FetchApi";
import { MySwitch } from "../../../helpers/customComponents";

export const ConfigureSettings = () => {
  const [address, setAddress] = React.useState("");
  const [phoneno, setPhoneno] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [id, setId] = React.useState("");
  const [banner1, setBanner1] = React.useState({ filename: "", bytes: "" });
  const [banner2, setBanner2] = React.useState({ filename: "", bytes: "" });
  const [banner3, setBanner3] = React.useState({ filename: "", bytes: "" });
  const [liveStatus, setLiveStatus] = React.useState(true);

  const fetchSettings = async () => {
    var result = await getData("web/getSettings");
    if (result.success) {
      setAddress(result.data[0].address);
      setPhoneno(result.data[0].phoneno);
      setMail(result.data[0].mail);
      setId(result.data[0].id);
      setBanner1({
        filename: `${ServerURL}/images/${result.data[0].storebanner1}`,
        bytes: "",
      });
      setBanner2({
        filename: `${ServerURL}/images/${result.data[0].storebanner2}`,
        bytes: "",
      });
      setBanner3({
        filename: `${ServerURL}/images/${result.data[0].storebanner3}`,
        bytes: "",
      });
      setLiveStatus(result.data[0].website_status);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleLiveStatus = async (e) => {
    setLiveStatus(e.target.checked);
    let body = { website_status: e.target.checked, id: id };
    let res = await postData("web/updateLiveStatus", body);
    if (res) {
      successMessage("Live Status Updated");
    } else {
      errorMessage("Something went wrong");
    }
  };

  const handleSubmit = async () => {
    let err = false;
    if (isEmpty(address)) {
      err = true;
      errorMessage("Address field should not be empty");
    }
    if (isEmpty(phoneno)) {
      err = true;
      errorMessage("Phone Number should not be empty");
    }
    if (isEmpty(mail)) {
      err = true;
      errorMessage("Mail should not be empty");
    }
    if (!err) {
      let formData = new FormData();
      formData.append("address", address);
      formData.append("phoneno", phoneno);
      formData.append("mail", mail);
      banner1.bytes != "" && formData.append("storebanner1", banner1.bytes);
      banner2.bytes != "" && formData.append("storebanner2", banner2.bytes);
      banner3.bytes != "" && formData.append("storebanner3", banner3.bytes);
      formData.append("id", id);

      var result = await postDataAndImage("web/configureSettings", formData);
      if (result) {
        successMessage("Saved Changes Successfully");
      } else {
        errorMessage("Something went wrong");
      }
    }
  };

  return (
    <Container>
      <h3>Configure Settings</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            label="Address"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            fullWidth
            label="Phone No"
            variant="outlined"
          />
        </Grid>
        <Grid container item xs={12} md={4}>
          <TextField
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            fullWidth
            label="Mail Address"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <MySwitch checked={liveStatus} onChange={handleLiveStatus} />
            }
            label="Website Live"
            labelPlacement="start"
          />
        </Grid>
        <Grid container item xs={12} md={8}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              id="banner-1"
              multiple
              type="file"
              onChange={(event) => {
                setBanner1({
                  filename: URL.createObjectURL(event.target.files[0]),
                  bytes: event.target.files[0],
                });
              }}
            />
            <label htmlFor="banner-1">
              <Button variant="outlined" color="primary" component="span">
                Store Banner 1
              </Button>
            </label>
            <Avatar
              alt="banner1"
              src={banner1.filename}
              variant="rounded"
              style={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              id="banner-2"
              multiple
              type="file"
              onChange={(event) => {
                setBanner2({
                  filename: URL.createObjectURL(event.target.files[0]),
                  bytes: event.target.files[0],
                });
              }}
            />
            <label htmlFor="banner-2">
              <Button variant="outlined" color="primary" component="span">
                Store Banner 2
              </Button>
            </label>
            <Avatar
              alt="banner2"
              src={banner2.filename}
              variant="rounded"
              style={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              accept="image/*"
              // className={classes.input}
              style={{ display: "none" }}
              id="banner-3"
              multiple
              type="file"
              onChange={(event) => {
                setBanner3({
                  filename: URL.createObjectURL(event.target.files[0]),
                  bytes: event.target.files[0],
                });
              }}
            />
            <label htmlFor="banner-3">
              <Button variant="outlined" color="primary" component="span">
                Store Banner 3
              </Button>
            </label>
            <Avatar
              alt="banner3"
              src={banner3.filename}
              variant="rounded"
              style={{ width: 100, height: 100 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ float: "right", marginTop: "2rem" }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
