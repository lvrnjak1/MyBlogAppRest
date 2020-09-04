import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { getUser } from "./Utils";
import SvgIcon from "@material-ui/core/SvgIcon";
import auth from "./Auth";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: `1em`,
  },
  toolbarTitle: {
    flex: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Header(props) {
  const classes = useStyles();
  const account = JSON.parse(getUser());

  const logout = () => {
    localStorage.clear();
    auth.logout();
    props.history.replace("/");
  };

  const goToMyProfile = () => {
    props.history.push("/profile/" + account.username, {
      isMyProfile: true,
      id: account.id,
    });
  };

  const goToDashboard = () => {
    props.history.push("/dashboard");
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button size="small" color="primary" onClick={goToMyProfile}>
          WELLCOME {account.name} {account.surname}
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {props.dashboard ? "BLOG: DASHBOARD" : "BLOG"}
        </Typography>
        <IconButton onClick={goToDashboard}>
          <HomeIcon color="primary" fontSize="large" />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          onClick={logout}
          className={classes.submit}
          color="primary"
          disableElevation
        >
          Log out
        </Button>
      </Toolbar>
    </div>
  );
}

export default Header;
