import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import API from "../Api";
import { getHeadersObject } from "./Utils";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    display: "center",
    padding: "3em",
    textAlign: "center",
  },
}));

export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [publishedMessage, setPublishedMessage] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
    setPublishedMessage("");
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    const response = await API.post(
      `/posts`,
      {
        title,
        body,
        dateTimePosted: new Date().getTime().toString(),
      },
      {
        headers: getHeadersObject(),
      }
    );

    if (props.callback) {
      props.callback(response.data);
    }

    setTitle("");
    setBody("");
    setPublishedMessage("Post successfully published");
  };

  return (
    <Card className={classes.card} raised variant="outlined">
      <form onSubmit={handleNewPost}>
        <Typography component="h3">New Post</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Post title"
          name="title"
          autoFocus
          onChange={handleChange}
          value={title}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          name="body"
          label="Post body"
          onChange={handleChange}
          value={body}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Publish
        </Button>
        <Typography component="label">{publishedMessage}</Typography>
      </form>
    </Card>
  );
}
