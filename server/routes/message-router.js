var express = require('express');
var router = express.Router();

var messageController = require('../controllers/message-controller');

router.get('/', messageController.getAllMessages);
router.post('/add', messageController.addMessage);
router.post('/delete', messageController.deleteMessage);

module.exports = router;
