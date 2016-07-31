import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import SC from 'soundcloud'

import { SC_SONG } from '../../constants'
import { addQueue } from '../../actions'
import { button, input } from './styles'

import InputForm from '../Forms'
import SearchResults from './SearchResults'

@connect(
	state => ({
		room: state.room,
		user: state.user,
	}),
	dispatch => ({
		addQueue: song => dispatch(addQueue(song))
	})
)
@Radium
export default class SCRequestForm extends Component {
	constructor(props) {
		super(props);
		this.state = { searchResults: [] }

		this.addSong = this.addSong.bind(this);
		this.getArtists = this.getArtists.bind(this);
		this.getSongs = this.getSongs.bind(this);
	}

	addSong(song) {
		const { addQueue, room, socket, user } = this.props;
		const songFinal = { ...song, suggestedBy: user };

		addQueue(songFinal);
		socket.emit('addQueue', { room, item: songFinal });
		this.setState({ searchResults: [] });
	}

	getArtists(songs) {
		songs.forEach( song => { 
			SC.get('/users/' + song.user_id)
				.then( artist => {
					this.setState({ 
						searchResults: [
							...this.state.searchResults, 
							{...song, artist, type: SC_SONG } 
						]
					});
				});
		})
	}

	getSongs(queryString) {
		this.setState({ searchResults: [] });
		
		if (!queryString) return;

		SC.get('/tracks', { q: queryString })
			.then( songs => this.getArtists(songs));
	}

	render() {
		const { searchResults } = this.state;
		return (
			<div>
				<InputForm
					buttonStyle={button}
					inputStyle={input}
					placeHolder='Search SoundCloud'
					buttonText='Search'
					submit={queryString => this.getSongs(queryString)} />
				<SearchResults 
					addSong={song => this.addSong(song)} 
					songs={searchResults} />
			</div>
		)
	}
}