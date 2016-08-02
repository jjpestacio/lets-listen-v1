import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import YouTubePlayer from 'youtube-player'

import { YT_ENDED, YT_PAUSED, YT_PLAYING } from '../../../constants'
import { changeTime, nextQueue } from '../../../actions'
import { button, buttons, controller } from './styles'

@connect(
	state => ({
		room: state.room
	}),
	dispatch => ({
		changeTime: time => dispatch(changeTime(time)),
		nextQueue: () => dispatch(nextQueue())
	})
)
@Radium
export default class YTPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = { isPlaying: false };

		this.next = this.next.bind(this);

		this.player = YouTubePlayer('iframe', {
			height: '100%',
			width: '100%',
			videoId: this.props.video.id.videoId,
			playerVars: {
				autoplay: 1,
				controls: 0
			}
		})
	}

	componentWillReceiveProps(newProps) {
		const { video } = newProps;
		console.log(video)
		if (video) this.player.loadVideoById(video.id.videoId);
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	componentDidMount() {
		const { changeTime } = this.props;
		
		// changeTime(0);
		// setInterval(() => {
		// 	console.log(this.player.getCurrentTime())
		// 	changeTime(this.player.getCurrentTime())
		// }, 500);

		this.player.on('stateChange', state => {
			switch (state.data) {
				case YT_ENDED: {
					this.next();
					break;
				}
				case YT_PAUSED: {
					this.setState({ isPlaying: false });
					break;
				}
				case YT_PLAYING: {
					this.setState({ isPlaying: true });
					break;
				}
			}
		})
	}

	next() {
		const { nextQueue, room, socket } = this.props;
		
		nextQueue();
		socket.emit('nextQueue', room);
	}

	render() {
		const { isPlaying } = this.state;
		const { video } = this.props;

		return (
			<div>
				<div className='controller' style={controller}>
					<div className='buttons' style={buttons}>
						{ isPlaying
							? <button 
								key={'pause'} 
								style={[button, { marginRight: '0.5vw' }]}
								onClick={() => this.player.pauseVideo()}
								>Pause</button>	
							: <button 
								key={'play'} 
								style={[button, { marginRight: '0.5vw' }]}
								onClick={() => this.player.playVideo()}
								>Play</button> }

						<button key={'next'} style={button} onClick={this.next}>Next</button>
					</div>
				</div>
			</div>
		)
	}
}