import { broswerHistory } from 'react-router'
import SC from 'soundcloud'

import { 
	ADD_QUEUE, ADD_USER, CHANGE_TIME, 
	INIT, JOIN_ROOM, LOGIN, NEXT_QUEUE, 
	REMOVE_USER, SET_DJ
} from '../constants'

export const addQueue = item => {
	return {
		type: ADD_QUEUE,
		item
	}
}

export const addUser = username => {
	return {
		type: ADD_USER,
		username
	}
}

export const changeTime = time => {
	return {
		type: CHANGE_TIME,
		time
	}
}

export const init = ( DJ, queue, users ) => {
	return {
		type: INIT,
		DJ,
		queue,
		users
	}
}

export const joinRoom = room => {
	return {
		type: JOIN_ROOM,
		room
	}
}

export const login = username => {
	return {
		type: LOGIN,
		username
	}
}

export const nextQueue = () => {
	return {
		type: NEXT_QUEUE
	}
}

export const removeUser = username => {
	return {
		type: REMOVE_USER,
		username
	}
}

export const setDJ = username => {
	return {
		type: SET_DJ,
		username
	}
}