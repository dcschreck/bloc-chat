import React, { Component } from 'react';
import '../styles/Messagelist.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            displayedMessages: [],
            newMessageContent: ''
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) }, () => {
                this.displayMessages(this.props.activeRoom);
            });
        });
    }

    displayMessages(activeRoom) {
        const filteredMessage = this.state.messages.filter(message => message.roomID.toString() === activeRoom);
        this.setState({ displayedMessages: filteredMessage });
    }

    componentWillReceiveProps(nextProps) {
        this.displayMessages(nextProps.activeRoom);
    }

    handleChange(e) {
        this.setState({ newMessageContent: e.target.value });
    }

    createMessage(e) {
        e.preventDefault();
        const newMessage = this.state.newMessageContent;
        this.messagesRef.push({
            content: newMessage,
            roomID: this.props.activeRoom,
            username: this.props.userInfo ? this.props.userInfo.displayName : "Guest",
            timestamp: Date(this.props.firebase.database.ServerValue.TIMESTAMP)
        });
        this.setState({ newMessageContent: '' });
    }

    render () {
        return (
            <div>
                { this.state.displayedMessages.map(message =>
                    <div className="messageblock" key={message.key}>
                        <div className="username">
                            {message.username}
                        </div>
                        <div className="content">
                            {message.content}
                        </div>
                        <div className="time">
                            {message.timestamp}
                        </div>
                    </div>
                )}
                <form className="newmessage" onSubmit={ (e) => this.createMessage(e) }>
                    <input type="text" placeholder="New Message" value={ this.state.newMessageContent} onChange={ (e) => this.handleChange(e)} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default MessageList;
