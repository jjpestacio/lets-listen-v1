module.exports = {
	button: {
		backgroundColor: '#ffa31a',
		border: 'none',
		borderRadius: '4px',
		color: '#ffffff',
		display:'block',
		fontSize: '1em',
		height: '3.6vw',
		// margin: '0 auto',
		opacity: '0.9',
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
		verticalAlign: 'top',
		width: '31vw',
		maxWidth: '340px',
		maxHeight: '700px',
		height: '80vh',
		padding: '10px',
		overflowY: 'auto'
	},
	home: {
		width: '100%',
		height: '100%',
		maxWidth: '1050px',
		maxHeight: '750px',
		margin: 'auto'
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
		color: '#ffa31a',
		display: 'block',
		fontSize: '1.5em',
		textShadow: '0.5px 0.5px 0.5px rgba(0,0,0,0.3)',
		verticalAlign: 'top',
	},
	row: {
		// border: '2px red solid',
		display: 'block',
		margin: '0',
		position: 'relative',
		width: '100%',
	},
	userListContainer: {
		borderRadius: '6px',
		width: '20vw', 
		maxWidth: '230px',
		marginRight: '1vw',
	}
}