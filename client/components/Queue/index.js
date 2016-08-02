import React, { Component } from 'react'
import { connect } from 'react-redux'

import { openLink } from '../../functions'

import ItemList from '../ItemList'

@connect(
	state => ({ 
		queue: state.queue 
	})
)

export default class Queue extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { queue } = this.props;
	
		return (
			<div>
				<ItemList 
					items={queue.slice(1, queue.length)} 
					onClick={item => openLink(item.permalink_url)} />
			</div>
		)
	}
}