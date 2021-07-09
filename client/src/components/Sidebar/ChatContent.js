import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { countUnreadMessages } from "../../store/conversations";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    minWidth: 20,
    backgroundColor: "#3F92FF",
    marginRight: 20,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingRight: 8,
    paddingLeft: 8,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessages, messages } = conversation;
  const conversationId = conversation.id;

  useEffect(() => {
    if (messages && messages[messages.length - 1].senderId === otherUser.id) {
      dispatch(countUnreadMessages(conversationId));
    }

  }, [latestMessageText])

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {(unreadMessages > 0) && 
        <Box>
          <Typography className={classes.notification}>
            {unreadMessages}
          </Typography>
        </Box>
      }
    </Box>
  );
};

export default ChatContent;
