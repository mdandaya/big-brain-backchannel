let pool = require('../database/database');

// Get all messages in the database
exports.getAllMessages = () => {
  var sql = 'select * from message;';
  return pool.query(sql);
};

exports.addMessage = (message) => {
  let sql =
    "insert into message (message_text, message_user_id) values ('" +
    message.text +
    "', '" +
    message.userID +
    "');";
  return pool.query(sql);
};

exports.deleteMessage = (id) => {
  var sql = "delete from message where message_id = '" + id + "';";
  return pool.query(sql);
};
