import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:3001',
      message: '',
      messageList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    let { endpoint, message } = this.state;
    const socket = io(endpoint);
    console.log('SEND: ' + message);
    socket.emit('message', message);
    this.setState({message: ''});
    event.preventDefault();
  }

  componentDidMount() {
    console.log(window.innerHeight);
    let self = this;
    let { endpoint, messageList } = this.state;
    const socket = io(endpoint);
    socket.on('message', function(message) {
      console.log('RECEIVE: ' + message);
      messageList.push(message);
      self.setState({messageList});
    });
  }

  render() {
    let formHeight = 40;
    let containerHeight = window.innerHeight - (formHeight + 30);
    return (
      <div className="container" style={{height: containerHeight}}>
        <ul>
          {this.state.messageList.map(function(message, key) {
            return <li key={key}>{message}</li>
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.message} onChange={this.handleChange} placeholder="Enter message"/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
