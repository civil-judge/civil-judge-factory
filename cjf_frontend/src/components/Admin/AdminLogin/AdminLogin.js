import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { postData } from "../../../helpers/FetchApi";
import { errorMessage } from "../../../helpers/checks";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Civil Judge Factory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: "30%",
    height: "30%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminLogin(props) {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useLayoutEffect(() => {
    if (localStorage.getItem("token") !== null) {
       props.history.push("/dashboard");
    }
  },[])

  const checkAdminLogin = async () => {
    var body = { email, password };
    var result = await postData("user/checkadminlogin", body);
    if (result.success) {
      // alert("TOKEN:",result.token)
      localStorage.setItem("token", JSON.stringify(result.token));
      props.history.replace({ pathname: "/dashboard" });
    } else {
      errorMessage("Invalid Email/Password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.avatar} src="/images/02.png" />
        <Typography component="h1" variant="h5">
          Admin Sign in
        </Typography>
        <main className={classes.form}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <h4 style={{cursor:'pointer'}}
            onClick={() => props.history.push("/")}
          >Go to Homepage</h4>
          <Button
            onClick={checkAdminLogin}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </main>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
