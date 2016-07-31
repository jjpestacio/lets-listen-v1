import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Radium from 'radium'

import { joinRoom } from '../../actions'

import { button, container, inlineButton, input, page } from './styles'
import InputForm from '../Forms'

@connect(
	state => ({}),
	dispatch => ({
		joinRoom: roomId => dispatch(joinRoom(roomId)),
	})
)
@Radium
export default class JoinRoom extends Component {
	constructor(props) {
		super(props);

		this.createRoom = this.createRoom.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
	}

	createRoom() {
		const { joinRoom, socket } = this.props;
		const roomId = (Math.floor(Math.random() * 10000)).toString();

		joinRoom(roomId);
		socket.emit('create room', roomId);
		browserHistory.push('/' + roomId + '/login');
	}

	joinRoom(roomId) {
		const { joinRoom, socket } = this.props;

		joinRoom(roomId);
		socket.emit('join room', roomId);
		browserHistory.push('/' + roomId + '/login');
	}

	render () {
		return (
			<div style={page}>
				<div className='joinRoom' style={container}>
					<button 
						onClick={this.createRoom}
						style={[button, { margin: '0 0 1vw 0' }]}
						>Create a Room</button>
					<InputForm
						buttonStyle={[button, inlineButton]}
						buttonText='Join'
						inputStyle={input}
						placeHolder='Room ID'
						submit={roomId => this.joinRoom(roomId)} />
				</div>
			</div>
		)
	}
}