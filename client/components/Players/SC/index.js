import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import SC from 'soundcloud'

import { changeTime, nextQueue } from '../../../actions'
import { button, buttons, controller } from './styles'

@connect(
	state => ({
		DJ: state.DJ,
		room: state.room,
		user: state.user
	}),
	dispatch => ({ 
		changeTime: time => dispatch(changeTime(time)),
		nextQueue: () => dispatch(nextQueue()) 
	})
)

@Radium
export default class SCPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = { isPlaying: false }
		this.currentSong = null;

		this.getNextSong = this.getNextSong.bind(this);
		this.next = this.next.bind(this);
	}

	componentDidMount() {
		const { song } = this.props;
		if (song) this.getNextSong(song);
	}

	componentWillReceiveProps(newProps) {
		const { song } = newProps;
		if (song) this.getNextSong(song);
	}

	componentWillUnmount() {
		if (this.currentSong) this.currentSong.pause();
	}

	getNextSong(song) {
		const { changeTime, nextQueue, room, socket } = this.props;

		SC.stream('/tracks/' + song.id, { auto_play: true })
			.then(currentSong => {
				this.currentSong = currentSong;
				
				// currentSong.on('time', () => {
				// 	const time = currentSong.currentTime();
				// 	changeTime(time);
				// 	socket.emit('changedTime', { room, time })
				// })

				currentSong.on('play', () => this.setState({ isPlaying: true }));
				currentSong.on('pause', () => this.setState({ isPlaying: false }));
				currentSong.on('finish', () => {
					this.setState({ isPlaying: false });
					nextQueue();
					socket.emit('nextQueue', room);
				})

				this.currentSong.play();
			})
	}

	next() {
		this.currentSong.seek(this.currentSong.streamInfo.duration);
	}

	render() {
		const { isPlaying } = this.state;
		const { DJ, song, user } = this.props;

		if (!song) 
			return null;

		return(
			<div className='controller' style={controller}>
				<div className='buttons' style={buttons}>
					{ isPlaying
						? <button 
							key={'pause'} 
							style={[button, { marginRight: '0.5vw' }]} 
							onClick={() => this.currentSong.pause()}
							>Pause</button>	
						: <button 
							key={'play'} 
							style={[button, { marginRight: '0.5vw' }]} 
							onClick={() => this.currentSong.play()}
							>Play</button> }

					<button key={'next'} style={button} onClick={this.next}>Next</button>
				</div>
			</div>
		) 
	}
}