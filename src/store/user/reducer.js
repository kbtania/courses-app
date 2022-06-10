import { LOGIN, LOGOUT } from './actionTypes';

const initialState = {
	isLoggedIn: false,
	userName: '',
	email: '',
	token: '',
	role: '',
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return { isLoggedIn: true, ...action.payload };
		case LOGOUT:
			return { name: '', email: '', token: '', ...action.payload };
		default:
			return state;
	}
}
