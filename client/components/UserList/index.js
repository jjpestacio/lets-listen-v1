import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import { setDJ } from '../../actions'

import User from './User'

@Radium
@connect(
	state => ({
		DJ: state.DJ,
		room: state.room,
		user: state.user,
		users: state.users
	}),
	dispatch => ({
		setDJ: username => dispatch(setDJ(username))
	})
)
export default class UserList extends Component {
	constructor(props) {
		super(props);

		this.setDJ = this.setDJ.bind(this);
	}

	setDJ(username) {
		const { room, setDJ, socket } = this.props;

		setDJ(username);
		socket.emit('setDJ', { room, username });
	}

	render() {
		const { DJ, user, username, users } = this.props;

		return (
			<div className='userList'>
				{ users.map(( username, i ) => 
					<User
						isDJ={username === DJ}
						key={i} 
						name={username} 
						setDJ={() => this.setDJ(username)}
						showButton={user === DJ && username !== DJ} />
				)}
			</div>		
		)
	}
}