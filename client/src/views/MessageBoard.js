import React from 'react';
import socketIOClient from 'socket.io-client';
import Message from './Messages';

var socket;
var subscribeToUpdate = (cb) => {
  socket.on('Update', () => {
    cb(null);
  });
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userID: '',
      messageList: '',
      text: '',
    };
  }

  componentDidMount() {
    socket = socketIOClient();
    console.log('App componentDidMount()');
    subscribeToUpdate((err) => {
      this.update();
    });
    this.update();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  update = () => {
    fetch('/api/messages')
      .then((res) => res.text())
      .then((data) => this.setState({ messageList: data, loaded: true }));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    console.log('App handleSubmit()');
    event.preventDefault();

    if (this.state.text.trim().length === 0) return;
    if (this.state.userID.trim().length === 0) {
      alert('please enter a valid name');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    };

    fetch('/api/messages/add', requestOptions)
      .then(() => this.update())
      .then(() => this.setState({ text: '' }));
  };

  renderMessages = (messageList, update) => {
    const messages = JSON.parse(messageList);
    const list = messages.map((data) => (
      <Message
        key={data.message_id}
        id={data.message_id}
        userID={data.message_user_id}
        datetime={data.message_datetime}
        text={data.message_text}
        update={update}
      />
    ));
    return list;
  };

  render() {
    return (
      <div>
        <div className="chatBox" style={{ height: '75vh', overflow: 'scroll' }}>
          {this.state.loaded ? (
            this.renderMessages(this.state.messageList, this.update)
          ) : (
            <div>'Loading Channel'</div>
          )}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="userID"
            placeholder="Your name"
            onChange={this.handleChange}
            // value={this.state.userID}
          />
          <input
            type="text"
            name="text"
            placeholder="Your message"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}
