import React, { Component } from 'react'
import Radium from 'radium'

import { NO_IMAGE } from '../../constants'
import {
	artistStyle, titleStyle,
	artwork, songStyle, songInfo,
} from './styles'

import SuggestedBy from '../SuggestedBy'

@Radium
export default class Song extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { addStyle, onClick, song } = this.props;
		const { artist, artwork_url, suggestedBy, title } = song;

		return (
			<div>
				{ suggestedBy
					? <SuggestedBy suggestedBy={suggestedBy} />
					: null }

				<div className='song' style={[songStyle, addStyle]}>
					<img  
						src={artwork_url ? artwork_url : NO_IMAGE}
						style={artwork} 
						onClick={onClick}/>
					<div style={songInfo}>
						<span style={artistStyle}>{artist.username}</span>
						<span style={titleStyle}>{title}</span>
					</div>
				</div>
			</div>
			)
	}
}