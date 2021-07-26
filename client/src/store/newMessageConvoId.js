const SET_NEW_MESSAGE_CONVO_ID = "SET_NEW_MESSAGE_CONVO_ID";

export const setNewMessageConvoId = (convoId) => {
  return {
    type: SET_NEW_MESSAGE_CONVO_ID,
    convoId
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_NEW_MESSAGE_CONVO_ID: {
      return action.convoId;
    }
    default:
      return state;
  }
};

export default reducer;
