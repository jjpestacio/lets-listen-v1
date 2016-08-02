import React, { Component } from 'react'

import { SC_SONG, YT_VIDEO } from '../../constants'

import Song from '../Items/SCSong'
import Video from '../Items/YTVideo'

export default class ItemList extends Component {
	constructor(props) {
		super(props);

		this.getItem = this.getItem.bind(this);
	}

	getItem(item, i) {
		const { onClick } = this.props;

		switch (item.type) {
			case SC_SONG: {
				return (
					<Song key={i} 
						onClick={() => onClick(item)}
						song={item} />
				)
			}

			case YT_VIDEO: {
				return (
					<Video key={i} 
						onClick={() => onClick(item)}
						video={item} />
				)
			}

			default:
				return null;
		}
	}

	render() {
		const { items } = this.props;
		
		return (
			<div className='itemList'>
				{ items.map(( item, i ) => this.getItem(item, i) )}
			</div>			
		) 
	}
}