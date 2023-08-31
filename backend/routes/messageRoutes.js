const express = require('express')
const router = express.Router()
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
const {protect} = require('../middleware/authMiddleware')

router.route("/:chatId").get(protect, allMessages); // allMessages will get fired if you type in any chatId
router.route("/").post(protect, sendMessage);


module.exports = router