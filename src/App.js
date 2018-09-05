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
        //console.log(room);
        this.setState({ activeRoom: room });
    }

    setUser(user) {
        //console.log(user.displayName);
        this.setState({ userInfo: user });
    }

    render() {
        return (
            <main>
                <section>
                    <div className="title">
                        <h1>ChattyApp</h1>
                    </div>
                    <div className="signin">
                        <User firebase={firebase} userInfo={this.state.userInfo} setUser={(user) => this.setUser(user)}/>
                    </div>
                </section>

                <section className="list">
                    <h3>Rooms</h3>
                    <div>
                        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
                    </div>
                </section>

                <section className="messages">
                    <MessageList firebase={firebase} activeRoom={this.state.activeRoom} userInfo={this.state.userInfo} setUser={(user) => this.setUser(user)}/>
                </section>
            </main>

        );
    }
}

export default App;
