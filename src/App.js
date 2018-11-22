import * as firebase from 'firebase';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
            activeRoom: '',
            userInfo: ''
        };
    }

    setActiveRoom(room) {
        this.setState({ activeRoom: room });
    }

    setUser(user) {
        this.setState({ userInfo: user });
    }

    render() {
        return (
            <main className="wrapper">
                <header class="header">
                    <h1>ChattyApp</h1>
                    <User firebase={firebase} userInfo={this.state.userInfo} setUser={(user) => this.setUser(user)}/>
                </header>

                <aside>
                    <h3>Rooms</h3>
                    <div className="roomlist">
                        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
                    </div>
                </aside>

                <article>
                    <MessageList firebase={firebase} activeRoom={this.state.activeRoom} userInfo={this.state.userInfo} setUser={(user) => this.setUser(user)}/>
                </article>
            </main>

        );
    }
}

export default App;
