import React, { Component } from 'react'

import ItemList from '../../ItemList'

export default class SearchResults extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { addSong, songs } = this.props;

		return (
			<div className='searchResults'>
				<ItemList 
					items={songs} 
					onClick={song => addSong(song)} />
			</div>
		)
	}
}