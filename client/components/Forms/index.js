import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

@Radium
class InputForm extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' }

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		const { minLength, submit } = this.props;
		const { value } = this.state;

		e.preventDefault();

		if (minLength && value.length < minLength) {
			alert('Must be atleast ' + minLength + 'characters');
			return;
		}

		submit(value);
		this.setState({ value: '' });
	}

	handleTextChange(e) {
		const { maxLength } = this.props;

		// Don't let user type more characters than maxLength
		if (maxLength && e.target.value.length > maxLength) 
			return;

		this.setState({ value: e.target.value });
	}

	render() {
		const { value } = this.state;
		const { buttonText, buttonStyle, inputStyle, placeHolder } = this.props;

		return (
			<form className='commentForm' onSubmit={this.handleSubmit}>
				<input
					autoComplete='off'
					style={inputStyle}
					type='text' 
					name='text' 
					placeholder={placeHolder}
					value={value} 
					onChange={this.handleTextChange} />
				<button
					key={buttonText}
					style={buttonStyle}
					type='submit'>
					{buttonText}
				</button>
			</form>
		)
	}
}

InputForm.propTypes = {
	buttonText: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	placeHolder: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired
}

export default InputForm