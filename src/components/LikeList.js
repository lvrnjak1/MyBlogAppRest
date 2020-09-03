import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { getModalStyle } from "./Utils";
import AccountList from "./AccountList.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LikeList(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div className="background">
      <Modal
        open={props.modalOpened}
        onClose={() => {
          props.setModalOpened(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <AccountList
            list={props.list}
            count={props.list.length}
            title="Liked by"
          />
        </div>
      </Modal>
    </div>
  );
}
