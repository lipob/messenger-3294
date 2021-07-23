import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";
import { moveConvoToTop } from '../../store/conversations';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newMessagesConvoId, setNewMessagesConvoId] = useState('')
  
  const conversations = props.conversations || [];
  const newMessageConvoId = props.newMessageConvoId
  const { handleChange, searchTerm } = props;

  useEffect(() => {
    setNewMessagesConvoId(newMessageConvoId)
  }, [newMessageConvoId])

  useEffect(() => {
    const convoIndex = conversations.findIndex(convo => convo.id === newMessageConvoId)
    if(convoIndex > 0) {
      dispatch(moveConvoToTop(newMessagesConvoId))
    }
  }, [newMessagesConvoId])

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) => conversation.otherUser.username.includes(searchTerm))
        .map((conversation) => {
          return <Chat conversation={conversation} key={conversation.otherUser.username} />;
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations && state.conversations,
    newMessageConvoId: state.newMessageConvoId
  };
};

export default connect(mapStateToProps)(Sidebar);
