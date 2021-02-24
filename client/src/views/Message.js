import React from 'react';

export default class Message extends React.Component {
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
    fetch('/api/messages/delete', requestOptions).then(() =>
      this.props.update()
    );
  };

  formatDate() {
    var date = new Date(this.props.datetime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
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
        <span>{this.props.userID + ' - '}</span>
        <span>{this.formatDate()}</span>
        <p>{this.props.text}</p>
        <form onSubmit={this.handleDelete} method="POST">
          <button>Delete</button>
        </form>
        <br />
      </div>
    );
  }
}
