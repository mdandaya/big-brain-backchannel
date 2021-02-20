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
    userID: req.body.userID,
  };

  messageModel.addMessage(message).then(() => {
    req.io.emit('Update');
    res.status(200).send({ res: 'addMessage() success' });
  });
};

exports.deleteMessage = (req, res, next) => {
  console.log('message-controller deleteMessage()');

  var id = req.body.id;

  messageModel.deleteMessage(id).then(() => {
    req.io.emit('Update');
    res.status(200).send({ res: 'addMessage() success' });
  });
};
