import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import axios from 'axios'

import { button, container, inlineButton, input, page } from './styles'
import { addUser, init, login, setDJ } from '../../actions'

import InputForm from '../Forms'

@connect(
	state => ({ 
		DJ: state.DJ,
		room: state.room,
		users: state.users
	}),
	dispatch => ({
		addUser: username => dispatch(addUser(username)),
		init: ( DJ, queue, users ) => dispatch(init(DJ, queue, users)),
		login: username => dispatch(login(username)),
		setDJ: username => dispatch(setDJ(username))
	})
)

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
		this.usernameTaken = this.usernameTaken.bind(this);
	}

	componentWillMount() {
		const { init, room } = this.props;

		axios.get('/states/' + room)
			.then(response => {
				const { DJ, queue, users } = response.data;
				init(DJ, queue, users);
		})
	}

	usernameTaken(username) {
		const { users } = this.props;
		return users.filter(name => name === username).length
	}

	login(username) {
		const { addUser, DJ, login, room, setDJ, socket } = this.props;

		if (this.usernameTaken(username)) {
			alert('Username taken');
			return;
		}

		login(username);
		addUser(username);
		socket.emit('login', { room, username });

		// No DJ set yet
		if (!DJ) {
			setDJ(username);
			socket.emit('setDJ', { room, username });
		}

		browserHistory.push('/' + room + '/home');
	}

	render() {
		return (
			<div className='loginPage' style={page}>
				<div style={container}>
					<InputForm 
						buttonStyle={[button, inlineButton]}
						inputStyle={input}
						buttonText='Login'
						minLength={2}
						maxLength={10}
						placeHolder='Type a username ...'
						submit={username => this.login(username)} />
				</div>
			</div>
		)
	}
}