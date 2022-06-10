import { LOGIN, LOGOUT, SET_USER } from './actionTypes';

const initialState = {
	isLoggedIn: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return { isLoggedIn: true, ...action.payload };
		case LOGOUT:
			return {
				name: '',
				email: '',
				token: '',
				role: 'user',
				...action.payload,
			};
		case SET_USER:
			return {
				role: 'admin',
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
