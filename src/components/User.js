import React, { Component } from 'react';

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    signIn() {
        this.provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(this.provider);
    }

    render () {
        return (
            <ul>
                <button onClick={this.signIn}>Sign In</button>
                <button onClick={() => this.props.firebase.auth().signOut()}>Sign Out</button>
            </ul>
        )
    }
}

export default User;
