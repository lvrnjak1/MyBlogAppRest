import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";
import NewPost from "./NewPost";
import Post from "./Post";
import Header from "./Header.js";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AccountList from "./AccountList";
import "../css/style.css";
import LikeList from "./LikeList.js";
import { getUser, getHeadersObject } from "./Utils";
import Api from "../Api";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export default function Profile(props) {
  const [account, setAccount] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const forceUpdate = useForceUpdate();
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const currentUser = JSON.parse(getUser());

  const openModal = (postId) => {
    setModalId(postId);
    setModalOpened(true);
  };

  useEffect(() => {
    const getAccountById = async () => {
      const username = props.match.params.username;
      Api.get(`accounts?username=${username}`, {
        headers: getHeadersObject(),
      })
        .then(async (response) => {
          console.log(response);
          setAccount(response.data);
          const id = response.data.id;

          const response2 = await Api.get(`/accounts/${id}/posts`, {
            headers: getHeadersObject(),
          });
          console.log(response2);
          setPosts(response2.data);

          const response3 = await Api.get(`/accounts/${id}/followers`, {
            headers: getHeadersObject(),
          });
          console.log(response3);
          setFollowers(response3.data);

          const response4 = await Api.get(`/accounts/${id}/following`, {
            headers: getHeadersObject(),
          });
          console.log(response4);
          setFollowing(response4.data);
        })
        .catch((error) => {
          props.history.push("/dashboard");
        });
    };

    getAccountById();
  }, [props.match.params.username]);

  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    Api.delete(`/posts/${id}`, { headers: getHeadersObject() }).then((res) => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  const handleEditPost = async (e, postId, newTitle, newBody, callback) => {
    e.preventDefault();
    await Api.put(
      `/posts/${postId}`,
      {
        title: newTitle,
        body: newBody,
      },
      {
        headers: getHeadersObject(),
      }
    ).then((res) => {
      let newPosts = posts.slice();
      let index = newPosts.findIndex((post) => post.id === postId);
      newPosts[index].title = res.data.title;
      newPosts[index].body = res.data.body;
      newPosts[index].edited = res.data.edited;
      setPosts(newPosts);
      callback(newTitle, newBody, true);
    });
  };

  const handleNewPost = (post) => {
    let newPosts = posts;
    newPosts.unshift(post);
    setPosts(newPosts);
    forceUpdate();
  };

  const toggleIsFollowed = () => {
    setAccount({
      ...account,
      followedByLoggedInAccount: !account.followedByLoggedInAccount,
    });
  };

  return (
    <div>
      <div>
        <Header {...props} dashboard={false}></Header>
        {modalOpened ? (
          <LikeList
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            modalId={modalId}
          ></LikeList>
        ) : (
          ""
        )}
        <div className="background">
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={8}>
                {props.match.params.username === currentUser.username ? (
                  <div>
                    <NewPost callback={handleNewPost}></NewPost>
                    <br></br>
                  </div>
                ) : (
                  ""
                )}
                <GridList cellHeight="auto" cols={1}>
                  {posts.length > 0 ? (
                    posts.map((post) => {
                      const author = {
                        id: account.id,
                        name: account.name,
                        surname: account.surname,
                        username: account.username,
                      };
                      return (
                        <GridListTile key={post.id}>
                          <Post
                            post={post}
                            author={author}
                            deleteOption={
                              props.match.params.username ===
                              currentUser.username
                            }
                            handleDelete={handleDeletePost}
                            handleEdit={handleEditPost}
                            openLikesList={openModal}
                          ></Post>
                        </GridListTile>
                      );
                    })
                  ) : (
                    <h1>No posts to show yet!</h1>
                  )}
                </GridList>
              </Grid>
              <Grid item xs={4}>
                <ProfileSnippet
                  account={{
                    id: account.id,
                    name: account.name,
                    surname: account.surname,
                    username: account.username,
                    email: account.email,
                    bio: account.bio,
                    following: account.numberOfFollowing,
                    followers: account.numberOfFollowers,
                    followedByLoggedInAccount:
                      account.followedByLoggedInAccount,
                  }}
                  isMyProfile={
                    props.match.params.username === currentUser.username
                  }
                  toggleIsFollowed={toggleIsFollowed}
                ></ProfileSnippet>
                <br></br>
                <AccountList
                  list={followers}
                  title="Followers"
                  count={account.numberOfFollowers}
                ></AccountList>
                <br></br>
                <AccountList
                  list={following}
                  title="Following"
                  count={account.numberOfFollowing}
                ></AccountList>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}
