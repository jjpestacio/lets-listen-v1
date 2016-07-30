import { combineReducers } from 'redux';

import { 
	ADD_QUEUE, ADD_USER, CHANGE_TIME, 
	INIT, JOIN_ROOM, LOGIN, NEXT_QUEUE, 
	REMOVE_USER, SET_DJ
} from '../constants'

const currentTimeReducer = ( state=null, action ) => {
	switch (action.type) {
		case CHANGE_TIME:
			return action.time;

		default:
			return state;
	}
}

const DJReducer = ( state=null, action ) => {
	switch (action.type) {
		case INIT:
			return action.DJ ? action.DJ : state;

		case SET_DJ:
			return action.username;
			
		default:
			return state;
	}
}

const queueReducer = ( state=[], action ) => {
	switch (action.type) {
		case INIT:
			return action.queue ? action.queue : state;

		case ADD_QUEUE: 
			return [...state, action.item]

		case NEXT_QUEUE: 
			return state.slice(1, state.length);

		default:
			return state;
	}
}

const roomReducer = ( state=null, action ) => {
	switch (action.type) {
		case JOIN_ROOM:
			return action.room;

		default:
			return state;
	}
}

const userReducer = ( state=null, action ) => {
	switch (action.type) {
		case LOGIN:
			return action.username;

		default:
			return state;
	}
}

const usersReducer = ( state=[], action ) => {
	switch (action.type) {
		case INIT: 
			return action.users ? action.users : state;

		case ADD_USER:
			return [...state, action.username];

		case REMOVE_USER:
			return state.filter( username => username !== action.username );

		default:
			return state;
	}
}

const reducer = combineReducers({
	currentTime: currentTimeReducer,
	DJ: DJReducer,
	queue: queueReducer,
	room: roomReducer,
	user: userReducer,	
	users: usersReducer,
});

export default reducer;