import React, { useState } from "react";
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
import { getUser } from "./Utils";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export default function Profile(props) {
  const [account, setAccount] = useState({});
  const forceUpdate = useForceUpdate();
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const currentUser = JSON.parse(getUser());

  const openModal = (postId) => {
    setModalId(postId);
    setModalOpened(true);
  };

  const handleDeletePost = async (e, id) => {
    // e.preventDefault();
    // await deletePost({
    //   variables: { postId: id },
    // }).then((res) => {
    //   if (res.data.status.success) {
    //     setAccount({
    //       ...account,
    //       posts: account.posts.filter((post) => post.id !== id),
    //     });
    //   }
    // });
  };

  const handleEditPost = async (e, postId, newTitle, newBody, callback) => {
    // e.preventDefault();
    // await editPost({
    //   variables: {
    //     postId,
    //     newTitle,
    //     newBody,
    //   },
    // })
    //   .then((res) => {
    //     let newPosts = account.posts.slice();
    //     let index = newPosts.findIndex((post) => post.id === res.data.post.id);
    //     newPosts[index].title = res.data.post.title;
    //     newPosts[index].body = res.data.post.body;
    //     newPosts[index].edited = res.data.post.edited;
    //     setAccount({
    //       ...account,
    //       posts: newPosts,
    //     });
    //   })
    //   .then(() => {
    //     callback(newTitle, newBody, true);
    //   });
  };

  const handleNewPost = (post) => {
    // let newPosts = account.posts;
    // newPosts.unshift(post);
    // setAccount({ ...account, posts: newPosts });
    // forceUpdate();
  };

  //   const { loading, error, data } = useQuery(Constants.GET_ACCOUNT_BY_USERNAME, {
  //     variables: {
  //       //accountId: props.location.state.id,
  //       username: props.match.params.username,
  //     },
  //     onCompleted(data) {
  //       setAccount(data.account);
  //       forceUpdate();
  //     },
  //     onError(error) {
  //       //hmm
  //       props.history.push("/dashboard");
  //     },
  //   });

  const toggleIsFollowed = () => {
    setAccount({
      ...account,
      isFollowedByLoggedInAccount: !account.isFollowedByLoggedInAccount,
    });
  };

  return (
    <div>
      {/* {!account.user || loading || error ? null : ( */}
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
                {props.match.params.username === currentUser.user.username ? (
                  <div>
                    <NewPost callback={handleNewPost}></NewPost>
                    <br></br>
                  </div>
                ) : (
                  ""
                )}
                <GridList cellHeight="auto" cols={1}>
                  {account.posts.length > 0 ? (
                    account.posts.map((post) => {
                      post["author"] = {
                        id: account.id,
                        name: account.name,
                        surname: account.surname,
                        user: {
                          username: account.user.username,
                        },
                      };
                      return (
                        <GridListTile key={post.id}>
                          <Post
                            post={post}
                            deleteOption={
                              props.match.params.username ===
                              currentUser.user.username
                            }
                            // deleteOption={props.location.state.isMyProfile}
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
                    username: account.user.username,
                    email: account.user.email,
                    bio: account.bio,
                    following: account.numberOfFollowing,
                    followers: account.numberOfFollowers,
                    isFollowedByLoggedInAccount:
                      account.isFollowedByLoggedInAccount,
                  }}
                  // isMyProfile={props.location.state.isMyProfile}
                  isMyProfile={
                    props.match.params.username === currentUser.user.username
                  }
                  toggleIsFollowed={toggleIsFollowed}
                ></ProfileSnippet>
                <br></br>
                <AccountList
                  list={data.account.followers}
                  title="Followers"
                  count={data.account.numberOfFollowers}
                ></AccountList>
                <br></br>
                <AccountList
                  list={data.account.following}
                  title="Following"
                  count={data.account.numberOfFollowing}
                ></AccountList>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
