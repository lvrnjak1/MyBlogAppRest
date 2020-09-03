// import React from "react";
// import Card from "@material-ui/core/Card";
// import { makeStyles } from "@material-ui/core/styles";
// import { CardContent, Grid } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
// import { useMutation } from "react-apollo";
// import Button from "@material-ui/core/Button";

// const useStyles = makeStyles({
//   card: {
//     display: "flex",
//   },
//   cardDetails: {
//     flex: 1,
//   },
//   cardMedia: {
//     width: 160,
//   },
//   blue: {
//     backgroundColor: "#f123d",
//   },
// });

// export default function ProfileSnippet(props) {
//   const classes = useStyles();

//   const [toggleFollow] = useMutation(Constants.TOGGLE_FOLLOW, {
//     onCompleted(data) {
//       props.toggleIsFollowed();
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
//       <Card className={classes.card} variant="outlined">
//         <div>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <Grid container justify="space-between" spacing={1}>
//                 <Grid item>
//                   <Typography component="h2" variant="h5">
//                     {props.account.name} {props.account.surname} (
//                     {props.account.username})
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <div>
//                     {!props.isMyProfile ? (
//                       <Button
//                         variant="contained"
//                         size="small"
//                         onClick={(e) => handleFollow(e, props.account.id)}
//                         className={classes.submit}
//                         color="primary"
//                         disableElevation
//                       >
//                         {props.account.isFollowedByLoggedInAccount
//                           ? "UNFOLLOW"
//                           : "FOLLOW"}
//                       </Button>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </Grid>
//               </Grid>
//             </div>
//             <Typography variant="subtitle1" color="textSecondary">
//               {props.account.email}
//             </Typography>
//             <Typography component="label">{props.account.bio} </Typography>
//           </CardContent>
//         </div>
//       </Card>
//     </div>
//   );
// }
