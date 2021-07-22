const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // for new conversations, make sure that the sender is the same as senderId
    if (sender && sender.id !== senderId) {
      return res.sendStatus(401);
    }

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      let conversation = await Conversation.findByPk(
        conversationId
      );
      // check if the sender belongs to the conversation and if it's true, create the message
      const isUserInConvo = conversation.user1Id !== senderId || conversation.user2Id !== senderId;
      if (!isUserInConvo) {
        return res.sendStatus(401);
      } else {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      }      
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
