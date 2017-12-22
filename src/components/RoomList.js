import React, { Component } from 'react';

class RoomList extends Component {
    render () {
        return (
            this.state = {
                rooms: []
            }
        )
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state.rooms.map(room);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }
}

export default RoomList;
