import React, { Component } from 'react';

class SendMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            newMessageContent: ''
        };
        this.messagesDb = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesDb.on('child_added', snapshot => {
            const messageUpdate = snapshot.val();
            messageUpdate.key = snapshot.key;
            this.setState({ chats: this.state.chats.concat( messageUpdate ) });
        });
    }

    handleChange(e) {
        this.setState({ newMessageContent: e.target.value })
    }

    createMessage(e) {
        e.preventDefault();
        const newMessage = this.state.newMessageContent;
        this.setState({ chats: [...this.state.chats, newMessage], newMessageContent: '' });
        this.messagesDb.push({
            content: newMessage,
            roomID: this.props.activeRoom,
            username: this.props.userInfo ? this.props.userInfo.displayName : "Guest",
            timestamp: this.props.firebase.database.ServerValue.TIMESTAMP
        });

    }

    render () {
        return (
            <ul>
                <form onSubmit={ (e) => this.createMessage(e) }>
                    <input type="text" value={ this.state.newMessageContent} onChange={ (e) => this.handleChange(e) }/>
                    <input type="submit"/>
                </form>
            </ul>
        )
    }
}

export default SendMessages;
