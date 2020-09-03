import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { saveUserData, saveUserToken } from "./Utils.js";
import auth from "./Auth";
import API from "../Api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "#ff5252",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    password: "",
    username: "",
    email: "",
  });
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [surnameErrorMessage, setSurnameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = () => {
    let valid = true;

    if (user.name.length === 0) {
      setNameErrorMessage("Name can't be blank");
      valid = false;
    }

    if (user.surname.length === 0) {
      setSurnameErrorMessage("Surname can't be blank");
      valid = false;
    }

    if (user.email.length === 0) {
      setEmailErrorMessage("Email can't be blank");
      valid = false;
    } else if (!user.email.includes("@")) {
      setEmailErrorMessage("Invalid email format");
      valid = false;
    }

    if (user.username.length === 0) {
      setUsernameErrorMessage("Username can't be blank");
      valid = false;
    } else if (user.username.length < 5) {
      setUsernameErrorMessage("Username must contain at least 5 characters");
      valid = false;
    }

    let pwRegex = /(?=.*[0-9])/;

    if (user.password.length === 0) {
      setPasswordErrorMessage("Password can't be blank");
      valid = false;
    } else if (user.password.length < 8) {
      setPasswordErrorMessage("Password must contain at least 8 characters");
      valid = false;
    } else if (!user.password.match(pwRegex)) {
      setPasswordErrorMessage("Password must contain at least one digit");
      valid = false;
    }

    return valid;
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    setPasswordErrorMessage("");
    setUsernameErrorMessage("");
    setEmailErrorMessage("");
    setNameErrorMessage("");
    setSurnameErrorMessage("");
    setErrorMessage("");
  };

  const update = (cache, data) => {
    saveUserData(data.data.account.account);
    saveUserToken(data.data.account.token);
    auth.login();
    props.history.push("/dashboard");
  };

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    API.post(`/auth/register`, {
      name: user.name,
      surname: user.surname,
      password: user.password,
      username: user.username,
      email: user.email,
    })
      .then((response) => {
        setErrorMessage("");
        saveUserToken(response.data.token);
        auth.login();
        API.get("/accounts", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
          .then((response2) => {
            saveUserData(response2.data);
            props.history.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        handleError(error.response.data.message);
        return;
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
              <Typography component="label" className={classes.error}>
                {nameErrorMessage}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                autoComplete="surname"
                onChange={handleChange}
              />
              <Typography component="label" className={classes.error}>
                {surnameErrorMessage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
              <Typography component="label" className={classes.error}>
                {usernameErrorMessage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <Typography component="label" className={classes.error}>
                {emailErrorMessage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Typography component="label" className={classes.error}>
                {passwordErrorMessage}
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Typography component="label" className={classes.error}>
            {errorMessage}
          </Typography>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login">
                Already have an account? Log in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
