import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import { button, input } from './styles'
import { YT_VIDEO } from '../../../constants'
import { addQueue } from '../../../actions'


import InputForm from '../../Forms'
import SearchResults from './SearchResults'

@connect (
	state => ({
		room: state.room,
		user: state.user
	}),
	dispatch => ({
		addQueue: video => dispatch(addQueue(video))
	})
)
@Radium
export default class YTRequestForm extends Component {
	constructor(props) {
		super(props);
		this.state = { searchResults: [] }

		this.addVideo = this.addVideo.bind(this);
		this.getVideo = this.getVideos.bind(this);
	}

	addVideo(video) {
		const { addQueue, room, socket, user } = this.props;
		const videoFinal = { ...video, suggestedBy: user };

		addQueue(videoFinal);
		socket.emit('addQueue', { room, item: videoFinal });
		this.setState({ searchResults: [] });
	}

	getVideos(queryString) {
		this.setState({ searchResults: [] });

		if (!queryString) return;

		gapi.client.youtube.search.list({
			maxResults: 10,
			part: 'snippet',
			q: queryString,
			type: 'video'
		}).then(response => {
			response.result.items.forEach( video => {
				this.setState({
					searchResults: [
						...this.state.searchResults,
						{...video, type: YT_VIDEO }
					]
				})
			})
		})
	}

	render() {
		const { searchResults } = this.state;

		return (
			<div>
				<InputForm 
					buttonStyle={button}
					inputStyle={input}
					placeHolder='Search YouTube'
					buttonText={'Search'} 
					submit={queryString => this.getVideos(queryString)}/>
				<SearchResults
					addVideo={video => this.addVideo(video)}
					videos={searchResults}/>
			</div>
		)
	}
}