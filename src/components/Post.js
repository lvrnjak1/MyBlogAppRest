import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import "../css/style.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import LikeList from "./LikeList.js";
import API from "../Api";
import { getHeadersObject } from "./Utils";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  blue: {
    backgroundColor: "#f123d",
  },
});

function Post(props) {
  const [likeButtonText, setLikeButtonText] = useState(
    props.post.likedByTheCurrentUser ? "Dislike" : "Like"
  );
  const [id] = useState(props.post.id);
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [dateTime] = useState(props.post.dateTimePosted);
  const [likes, setLikes] = useState(props.post.numberOfLikes);
  const [like_plural, setLikePlural] = useState(props.post.numberOfLikes !== 1);
  const [edited, setEdited] = useState(props.post.edited);
  const [editing, setEditing] = useState(false);
  const [titleEdited, setTItleEdited] = useState(title);
  const [bodyEdited, setBodyEdited] = useState(body);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalList, setModalList] = useState([]);

  useEffect(() => {
    setLikePlural(likes !== 1);
  }, [likes]);

  const classes = useStyles();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      const response = await API.get(`/posts/${id}/author`, {
        headers: getHeadersObject(),
      });
      setAuthor(response.data);
    };

    getAuthor();
  }, []);

  const stringFromDate = (d) => {
    let date = new Date(parseInt(d));
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10 ? "0" + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return day + "." + month + "." + year + " " + hours + ":" + minutes;
  };

  //   const [toggleLike] = useMutation(Constants.TOGGLE_LIKE, {
  //     onCompleted(data) {
  //       setLikes(data.post.numberOfLikes);
  //       setLikeButtonText(likeButtonText === "Like" ? "Dislike" : "Like");
  //     },
  //   });

  const handleLike = async (e) => {
    //     e.preventDefault();
    //     //await toggleLike({ variables: { postId: id } });
  };

  const handleEdit = (e) => {
    //     setEditing(!editing);
    //     props.handleEdit(e, id, titleEdited, bodyEdited, update);
  };

  //   const update = (newTitle, newBody, newEdited) => {
  //     setTitle(newTitle);
  //     setBody(newBody);
  //     setEdited(newEdited);
  //   };

  const handleOpenLikes = async () => {
    const response = await API.get(`/posts/${id}/likes`, {
      headers: getHeadersObject(),
    });
    setLikes(response.data.length);
    openModal(id, response.data);
  };

  const openModal = (postId, list) => {
    setModalId(postId);
    setModalList(list);
    setModalOpened(true);
  };

  return (
    <div>
      {modalOpened ? (
        <LikeList
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          modalId={modalId}
          list={modalList}
        ></LikeList>
      ) : (
        ""
      )}
      <Grid item xs={12}>
        <Card className={classes.card} variant="outlined">
          <div className={classes.cardDetails}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {!editing ? (
                  <Typography component="h2" variant="h5">
                    {title}
                  </Typography>
                ) : (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="title"
                    name="title"
                    autoFocus
                    value={titleEdited}
                    onChange={(e) => {
                      setTItleEdited(e.target.value);
                    }}
                  />
                )}

                {props.deleteOption ? (
                  <div>
                    <IconButton
                      onClick={(e) => props.handleDelete(e, id)}
                      style={{ float: "right" }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setEditing(!editing)}
                      style={{ float: "right" }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Typography variant="subtitle1" color="textSecondary">
                {stringFromDate(dateTime)} by{" "}
                <Link
                  to={{
                    pathname: `/profile/${author.username}`,
                    state: { isMyProfile: props.deleteOption, id: author.id },
                  }}
                  className="link"
                >
                  {author.name + " " + author.surname}
                </Link>
                {edited ? " (edited)" : ""}
              </Typography>
              {!editing ? (
                <Typography variant="subtitle1" paragraph>
                  {body}
                </Typography>
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="body"
                  name="body"
                  autoFocus
                  value={bodyEdited}
                  onChange={(e) => {
                    setBodyEdited(e.target.value);
                  }}
                />
              )}

              {!editing ? (
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.submit}
                    color="primary"
                    onClick={handleLike}
                  >
                    {likeButtonText}
                  </Button>
                  <Button onClick={handleOpenLikes}>
                    Liked by {likes} user{like_plural ? "s" : ""}
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.submit}
                    color="primary"
                    onClick={handleEdit}
                  >
                    Done
                  </Button>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default Post;
