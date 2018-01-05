import * as firebase from 'firebase';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAV71TfeGDc7_aNBhmX7BrcoxeZTDvW5BY",
    authDomain: "bloc-chat-84bc7.firebaseapp.com",
    databaseURL: "https://bloc-chat-84bc7.firebaseio.com",
    projectId: "bloc-chat-84bc7",
    storageBucket: "bloc-chat-84bc7.appspot.com",
    messagingSenderId: "583760237496"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: ''
        };
    }

    setActiveRoom(room) {
        this.setState({ activeRoom: room });
        console.log(this.state.activeRoom);
    }

    render() {
        return (
            <div className="App">
                <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
                <MessageList firebase={firebase}/>
            </div>
        );
    }
}

export default App;
