import React, { Component } from 'react'
import Radium from 'radium'

import { NO_IMAGE } from '../../constants'
import {
	channelTitleStyle, titleStyle,
	artwork, videoStyle, videoInfo,
} from './styles'

import SuggestedBy from '../SuggestedBy'

@Radium
export default class Video extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { addStyle, onClick, video } = this.props;
		const { suggestedBy } = video;
		const { channelTitle, title } = video.snippet;
		const artworkUrl = video.snippet.thumbnails.medium.url;

		return (
			<div>
				{ suggestedBy
					? <SuggestedBy suggestedBy={suggestedBy} />
					: null }

				<div className='video' style={[videoStyle, addStyle]}>
					<img 
						src={artworkUrl ? artworkUrl : NO_IMAGE} 
						style={artwork}
						onClick={onClick} />
					<div style={videoInfo}>
						<span style={channelTitleStyle}>{channelTitle}</span>
						<span style={titleStyle}>{title}</span>
					</div>
				</div>
			</div>
			)
	}
}