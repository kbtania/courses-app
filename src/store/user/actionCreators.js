import { LOGIN, LOGOUT, SET_USER } from './actionTypes';

export function logIn(userData) {
	return {
		type: LOGIN,
		payload: userData,
	};
}

export function logOut(data) {
	return {
		type: LOGOUT,
		payload: data,
	};
}

export function setUser(data) {
	return {
		type: SET_USER,
		payload: data,
	};
}
