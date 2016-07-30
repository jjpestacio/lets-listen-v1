import React, { Component } from 'react'

import { SC_SONG, YT_USER } from '../../constants'

import Song from '../Song'
import Video from '../Video'

export default class ItemList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { items, onClick } = this.props;

		return (
			<div className='itemList'>
				{ items.map(( item, i ) => item.type === SC_SONG
					? <Song key={i} 
						onClick={() => onClick(item)}
						song={item} />
					: <Video key={i} 
						onClick={() => onClick(item)}
						video={item} />
				)}	
			</div>			
		) 
	}
}