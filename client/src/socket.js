import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { setNewMessageConvoId } from './store/newMessageConvoId';

const token = localStorage.getItem("messenger-token");

const socket = io(window.location.origin, { auth: {token} });

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(setNewMessageConvoId(data.message.conversationId));
  });
});

export default socket;
