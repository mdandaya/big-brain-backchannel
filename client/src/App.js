import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDelete = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.props),
    };
    fetch('/messages/delete', requestOptions).then(() => this.props.update());
  };

  formatDate() {
    var date = new Date(this.props.datetime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  }

  render() {
    return (
      <div>
        <br />
        <p>{this.props.userID}</p>
        <p>{this.formatDate()}</p>
        <p>{this.props.text}</p>
        <form onSubmit={this.handleDelete} method="POST">
          <button>Delete</button>
        </form>
        <br />
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userID: 'test',
      messageList: '',
      text: '',
    };
  }

  componentDidMount() {
    this.update();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  update = () => {
    fetch('/messages')
      .then((res) => res.text())
      .then((data) => this.setState({ messageList: data, loaded: true }));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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

  handleSubmit = (event) => {
    console.log('App handleSubmit()');
    event.preventDefault();

    if (this.state.text.trim().length === 0) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    };

    fetch('/messages/add', requestOptions)
      .then(() => this.update())
      .then(() => this.setState({ text: '' }));
  };

  render() {
    console.log(this.state);
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
            name="text"
            placeholder="Your message"
            onChange={this.handleChange}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}
