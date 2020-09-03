// import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import Card from "@material-ui/core/Card";
// import { makeStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import Typography from "@material-ui/core/Typography";
// import { withApollo, useMutation } from "react-apollo";
// import Grid from "@material-ui/core/Grid";
// import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
// import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// import { Link } from "react-router-dom";
// import "../css/style.css";
// import { getUser } from "./Utils.js";

// const useStyles = makeStyles({
//   card: {
//     display: "flex",
//     padding: "0.5em",
//   },
// });

// //create your forceUpdate hook
// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue((value) => ++value); // update the state to force render
// }

// function Search(props) {
//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const currenUser = JSON.parse(getUser());
//   const classes = useStyles();
//   const forceUpdate = useForceUpdate();

//   const searchAccounts = async (e) => {
//     const result = await props.client.query({
//       query: Constants.SEARCH,
//       variables: { toSearch: e.target.value },
//     });
//     setSearchResults(result.data.results);
//   };

//   const [toggleFollow] = useMutation(Constants.TOGGLE_FOLLOW, {
//     onCompleted(data) {
//       let index = searchResults.findIndex(
//         (account) => account.id === data.account.id
//       );
//       let results = searchResults;
//       results[index].isFollowedByLoggedInAccount =
//         data.account.isFollowedByLoggedInAccount;
//       setSearchResults(results);
//       forceUpdate();
//     },
//   });

//   const handleFollow = async (e, id) => {
//     e.preventDefault();
//     await toggleFollow({
//       variables: { followeeId: id },
//     });
//   };

//   return (
//     <div>
//       <Card variant="outlined" className={classes.card}>
//         <Grid container>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               id="query"
//               label="Search..."
//               name="query"
//               autoFocus
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 if (e.target.value !== "") {
//                   searchAccounts(e);
//                 } else {
//                   setSearchResults([]);
//                 }
//               }}
//               value={query}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <GridList cellHeight={50} cols={1}>
//               {searchResults.map((account) => {
//                 const isMyProfile =
//                   account.user.username === currenUser.user.username;
//                 return (
//                   <GridListTile key={account.id}>
//                     <IconButton onClick={(e) => handleFollow(e, account.id)}>
//                       {isMyProfile ? (
//                         <div></div>
//                       ) : (
//                         <div>
//                           {account.isFollowedByLoggedInAccount ? (
//                             <RemoveCircleOutlineIcon color="primary"></RemoveCircleOutlineIcon>
//                           ) : (
//                             <AddCircleOutlineOutlinedIcon color="primary"></AddCircleOutlineOutlinedIcon>
//                           )}
//                         </div>
//                       )}
//                     </IconButton>
//                     <Link
//                       to={{
//                         pathname: `/profile/${account.user.username}`,
//                         state: {
//                           isMyProfile: isMyProfile,
//                           id: account.id,
//                         },
//                       }}
//                       className="link"
//                     >
//                       <Typography component="label">
//                         {account.name} {account.surname}{" "}
//                       </Typography>
//                       <Typography component="label" color="textSecondary">
//                         {account.user.username}
//                       </Typography>
//                     </Link>
//                   </GridListTile>
//                 );
//               })}
//             </GridList>
//           </Grid>
//         </Grid>
//       </Card>
//     </div>
//   );
// }
// export default withApollo(Search);
