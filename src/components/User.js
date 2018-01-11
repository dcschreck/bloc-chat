import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    render () {
        return (
            <ul>
                <button onClick={(provider) => this.props.firebase.auth().signInWithPopup(provider)}>Sign In</button>
                <button onClick={() => this.props.firebase.auth().signOut()}>Sign Out</button>
            </ul>
        )
    }
}

export default User;
