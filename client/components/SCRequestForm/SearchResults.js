import React, { Component } from 'react'

import ItemList from '../ItemList'

export default class SearchResults extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { addSong, songs } = this.props;

		return (
			<div id='search-results'>
				<ItemList 
					items={songs} 
					onClick={song => addSong(song)} />
			</div>
		)
	}
}