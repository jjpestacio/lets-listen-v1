module.exports = {
	button: {
		backgroundColor: '#ff5500',
		border: 'none',
		borderRadius: '4px',
		color: '#ffffff',
		display:'block',
		fontSize: '1em',
		height: '3.6vw',
		// margin: '0 auto',
		opacity: '0.8',
		padding: '1vw',
		width: '20vw',
		verticalAlign: 'top',
		':hover': {
			opacity: '1'
		},
	},
	container: {
		alignSelf: 'center',
		// border: '2px red solid',
	},
	col: {
		// border: '2px red solid',
		display: 'inline-block',
		margin: '0 1vw',
		verticalAlign: 'top',
		width: '30vw',
	},
	input: {
		backgroundColor: '#e5e5e5',
		border: 'none',
		borderRadius: '4px 0 0 4px',
		color: '#a2a2a2',
		display: 'inline-block',
		fontSize: '1em',
		height: '2vw',
		// margin: '10px 0',
		padding: '0.8vw',
		width: '20vw',
		verticalAlign: 'top',
		':focus': {
			backgroundColor: 'white',
			color: '#525f59',
		}
	},
	inlineButton: { 
		borderRadius: '0px 4px 4px 0px', 
		display: 'inline-block',
	},
	page: {
		display: 'flex', 
		height: '100vh', 
		justifyContent: 'center', 
		width: '100vw',
	},
	roomId: {
		color: '#ff5500',
		display: 'inline-block',
		fontSize: '1.5em',
		opacity: '0.8',
		textShadow: '0.5px 0.5px 0.5px rgba(0,0,0,0.3)',
		verticalAlign: 'top',
		':hover': {
			opacity: '1'
		}
	},
	row: {
		// border: '2px red solid',
		display: 'block',
		margin: '0',
		position: 'relative',
		width: '100%',
	},
	'@media (max-width: 20em)': {
		backgroundColor: 'black'
	}
}