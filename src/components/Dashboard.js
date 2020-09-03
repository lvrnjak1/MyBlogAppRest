import React, { useState, useEffect } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Post from "./Post.js";
import NewPost from "./NewPost";
import Header from "./Header.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../css/style.css";
import Search from "./Search.js";
import API from "../Api";

function Dashboard(props) {
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const populateFeed = async () => {
      const response = await API.get(`/posts?offsetDays=0&numberOfDays=100`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //console.log(response);
      setFeedPosts(response.data);
    };

    populateFeed();
  }, []);

  return (
    <div>
      <Header
        {...props}
        dashboard={true}
        setLoggedIn={props.setLoggedIn}
      ></Header>
      <div className="background">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={8}>
              {/* <NewPost></NewPost> */}
              <br></br>
              <div>
                <GridList cellhight="auto" cols={1}>
                  {feedPosts.map((post) => (
                    <GridListTile key={post.id}>
                      <Post post={post} deleteOption={false}></Post>
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Grid>
            <Grid item xs={4}>
              {/* <Search></Search> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
