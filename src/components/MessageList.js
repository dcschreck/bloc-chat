import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            displayedMessages: []
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

    displayMessages(activeRoom) {
        const filteredMessage = this.state.messages.filter(message => message.roomID.toString() === activeRoom);
        this.setState({ displayedMessages: filteredMessage });
    }

    componentWillReceiveProps(nextProps) {
        this.displayMessages(nextProps.activeRoom);
    }

    render () {
        return (
            <ul>
                { this.state.displayedMessages.map(message =>
                    <li key={message.key}>
                        {message.content}
                    </li>
                )}
            </ul>
        )
    }
}

export default MessageList;
