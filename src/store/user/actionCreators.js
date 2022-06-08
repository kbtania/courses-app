import { LOGIN, LOGOUT } from './actionTypes';

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
