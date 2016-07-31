import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium, { StyleRoot } from 'radium'
import io from 'socket.io-client'
import SC from 'soundcloud'
// import google from 'googleapis'
import { SC_CLIENT_ID, YT_SERVER_KEY } from '../constants'
import { 
	addQueue, addUser, changeTime, joinRoom,
	login, nextQueue, removeUser, setDJ 
} from '../actions'

@connect(
	state => ({}),
	dispatch => ({
		addQueue: item => dispatch(addQueue(item)),
		addUser: username => dispatch(addUser(username)),
		changeTime: time => dispatch(changeTime(time)),
		joinRoom: room => dispatch(joinRoom(room)),
		login: username => dispatch(login(username)),
		nextQueue: () => dispatch(nextQueue()),
		removeUser: username => dispatch(removeUser(username)),
		setDJ: username => dispatch(setDJ(username))
	})
)
@Radium
export default class App extends Component {
	constructor(props) {
		super(props);

		// init SoundCloud api
		SC.initialize({ client_id: SC_CLIENT_ID });

		// init YouTube api
		gapi.load('client', () => {
			gapi.client.setApiKey(YT_SERVER_KEY);
			gapi.client.load('youtube', 'v3').then(() => console.log('loaded youtube'))
		})
	}

	componentWillMount() {
		this.socket = io();	
	}

	componentDidMount() {
		const { 
			addQueue, addUser, changeTime, joinRoom,
			login, nextQueue, removeUser, setDJ 
		} = this.props;

		setInterval(() => {
			this.socket.emit('ping')	
		}, 50000);

		this.socket.on('addQueue', item => addQueue(item));
		this.socket.on('changedTime', time => changeTime(time));
		this.socket.on('createdRoom', room => joinRoom(room));
		this.socket.on('login', username => addUser(username));
		this.socket.on('logout', username => removeUser(username));
		this.socket.on('nextQueue', () => nextQueue());
		this.socket.on('setDJ', username => setDJ(username));
	}

	render() {
		return (
			<div id='app'>
				<StyleRoot>
					{ this.props.children 
						&& React.cloneElement(
							this.props.children,
							{ socket: this.socket }
						)
					}
				</StyleRoot>
			</div>
		)
	}
}