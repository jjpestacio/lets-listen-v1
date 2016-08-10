import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Radium from 'radium'

import { col, roomId, row, userListContainer, home } from './styles'
import { SC_SONG, YT_VIDEO } from '../../constants'
import { openLink } from '../../functions'

import Queue from '../Queue'
import SCPlayer from '../Players/SC'
import SCRequestForm from '../RequestForms/SC'
import Song from '../Items/SCSong'
// import Timer from '../Timer'
import UserList from '../UserList'
import Video from '../Items/YTVideo'
import YTPlayer from '../Players/YT'
import YTRequestForm from '../RequestForms/YT'

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

		// For Heroku apps, connections auto idle at 55 secs
		setInterval(() => console.log('ping'), 53000);
	}

	getPlayer(current) {
		const { DJ, socket, user } = this.props;

		if (!current) 
			return null;

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
			<div className='home' style={home}>
				<div className='navbar' style={[row, { margin: '0 0 1vw 0' }]}>
					<div style={roomId}>
						<span>{room}</span>
					</div>
				</div>
				<div className='body' style={row}>
					<div className='userList' style={[ col, userListContainer ]}>
						<UserList socket={socket} />
					</div>
					<div className='player-search' style={col}>
						<div id='player' style={row}>
							<div id='iframe' />
							{this.getPlayer(current)}	
						</div>
						<div className='search' style={row}>
							<SCRequestForm socket={socket} />
							<YTRequestForm socket={socket} />
						</div>
					</div>
					<div className='queue' style={col}>
						<Queue />
					</div>
				</div>
			</div>
		)
	}
}