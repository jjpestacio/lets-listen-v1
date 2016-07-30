import { 
	applyMiddleware, createStore, 
	combineReducers, compose 
} from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import initialState from './initialState'

export default createStore(
	reducer, 
	initialState,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)