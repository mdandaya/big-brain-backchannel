var messageModel = require('../models/message-model');

exports.getAllMessages = (req, res, next) => {
  console.log('message-controller getAllMessages()');
  messageModel.getAllMessages().then((data) => {
    res.status(200).send(data.rows);
  });
};

exports.addMessage = (req, res, next) => {
  console.log('message-controller addMessage()');
  console.log(req.body);

  var message = {
    text: req.body.text,
    userId: req.body.userID,
  };

  messageModel
    .addMessage(message)
    .then(() => res.status(200).send({ message: 'addMessage() success' }));
};

exports.deleteMessage = (req, res, next) => {
  console.log('message-controller deleteMessage()');

  var id = req.body.id;

  messageModel
    .deleteMessage(id)
    .then(() => res.status(200).send({ message: 'addMessage() success' }));
};
