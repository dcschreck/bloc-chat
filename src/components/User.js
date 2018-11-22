import React, { Component } from 'react';
import '../styles/User.css';

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    signIn = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    }

    render () {
        return (
            <main class="signin">
                {this.props.userInfo ? this.props.userInfo.displayName : "Guest"}
                <button onClick={this.signIn}>Sign In</button>
                <button onClick={() => this.props.firebase.auth().signOut()}>Sign Out</button>
            </main>
        )
    }
}

export default User;
