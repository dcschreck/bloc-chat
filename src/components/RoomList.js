import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName:''
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }

    createRoom(e) {
        e.preventDefault();
        //if (!this.state.newRoomName) { return }
        const newRoom = this.state.newRoomName;
        this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: '' });
        this.roomsRef.push({
            name: newRoom
        });
    }

    render () {
        return (
            <ul>
                {this.state.rooms.map(room =>
                    <li key={room.key} onClick={ () => this.props.setActiveRoom(room.key) }>
                        {room.name}
                    </li>
                )}
                <form onSubmit={ (e) => this.createRoom(e) }>
                    <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) }/>
                    <input type="submit"/>
                </form>
            </ul>
        )
    }
}

export default RoomList;
