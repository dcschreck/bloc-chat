import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

    displayMessages() {
        const activeMessage = this.props.activeRoom;
        const filteredMessage = this.state.messages.key.filter(message => message === activeMessage);
        this.setState({ messages: filteredMessage });
    }

    render () {
        return (
            <ul>
                { this.state.messages.map(message =>
                    <li key={message.key} onClick={ (activeRoom) => this.displayMessages(activeRoom) }>
                    </li>
                )}
            </ul>
        )
    }
}

export default MessageList;
