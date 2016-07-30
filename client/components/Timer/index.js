import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import { SEC, MS } from '../../constants'

@Radium
@connect(
	state => ({
		time: state.currentTime
	})
)
export default class Timer extends Component {
	constructor(props) {
		super(props);

		this.convertTime = this.convertTime.bind(this);
	}

	convertTime(time) {
		const { format } = this.props;
		let minutes;
		let seconds;

		switch (format) {
			case MS: {
				minutes = Math.floor(time / 60000); // 1 min = 60,000 ms
				seconds = Math.floor((time % 60000) / 1000); // 1 sec = 1,000 ms
				break;
			}

			case SEC: {
				minutes = Math.floor(time / 60); // 1 min = 60s
				seconds = Math.floor(time % 60);
				break;
			}

			default:
				return time;
		}

		if (Math.floor(seconds / 10) === 0) 
			return minutes + ':0' + seconds;
		else
			return minutes + ':' + seconds;		
	}

	render() {
		const { time, style } = this.props;

		return (
			<span style={style}>{this.convertTime(time)}</span>
		)
	}
}