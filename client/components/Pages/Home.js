import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Radium from 'radium'

import { col, roomId, row } from './styles'
import { timer } from '../Timer/styles'
import { SC_SONG, SEC, MS, YT_VIDEO } from '../../constants'
import { openLink } from '../../functions'

import Queue from '../Queue'
import SCPlayer from '../SCPlayer'
import SCRequestForm from '../SCRequestForm'
import Song from '../Song'
// import Timer from '../Timer'
import UserList from '../UserList'
import Video from '../Video'
import YTPlayer from '../YTPlayer'
import YTRequestForm from '../YTRequestForm'

@connect(
	state => ({
		DJ: state.DJ,
		queue: state.queue,
		room: state.room,
		user: state.user
	})
)
@Radium
export default class Home extends Component {
	constructor(props) {
		super(props);
	
		this.getPlayer = this.getPlayer.bind(this);
	}

	componentDidMount() {
		const { socket } = this.props;

		setInterval(() => {
			console.log('ping')
		}, 53000);
	}

	getPlayer(current) {
		const { DJ, socket, user } = this.props;

		if (!current) return null;

		switch (current.type) {
			case SC_SONG: {
				return (
					<div>
						<Song
							addStyle={{ opacity: '0.95' }}
							onClick={() => openLink(current.permalink_url)}
							song={current} />	
						{ user === DJ 
							? <SCPlayer socket={socket} song={current} /> 
							: null }
					</div>
				)
			}

			case YT_VIDEO: {
				return ( 
					<div>
						<Video video={current} />
						{ user === DJ
							? <YTPlayer socket={socket} video={current} /> 	
							: null }
					</div> 
				)
			}

			default:
				return null;
		}
	}

	render() {
		const { queue, room, socket } = this.props;
		const current = queue[0];

		return(
			<div className='page'>
				<div className='navbar' style={[row, { margin: '0 0 1vw 0' }]}>
					<div style={col}>
						<span style={roomId}>{room}</span>
					</div>
				</div>
				<div style={row}>
					<div className='userList' style={col}>
						<UserList socket={socket} />
					</div>
					<div style={col}>
						<div id='player' style={row}>
							<div id='iframe' />
							{this.getPlayer(current)}	
						</div>
						<div className='search' style={row}>
							<SCRequestForm socket={socket} />
							<YTRequestForm socket={socket} />
						</div>
					</div>
					<div style={col}>
						<Queue />
					</div>

				</div>
			</div>
		)
	}
}