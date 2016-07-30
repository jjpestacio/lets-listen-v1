import React, { Component } from 'react'

import { suggest, suggestedByUser } from './styles'

const SuggestedBy = ({ suggestedBy }) => (
	<div style={suggest}>
		<div style={suggestedByUser}>
			<span>Suggested by </span>
			<span style={{ color: 'rgba(0,0,0,0.7)' }}>{suggestedBy}</span>
		</div>
	</div>
)

export default SuggestedBy