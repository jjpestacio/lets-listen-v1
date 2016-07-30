import React, { Component } from 'react'
import Radium from 'radium'

import { button, DJ, user } from './styles'

@Radium
export default class User extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { isDJ, name, setDJ, showButton } = this.props;

		return (
			<div className='user'>
				{ isDJ 
					? <div style={[user, DJ]}>{name}</div> 
					: <div style={user}>{name}</div> }

				{ showButton 
					? <button 
						key={name} 
						style={button} 
						onClick={setDJ}
						>Set DJ</button>
					: null }
			</div>
		)
	}
}