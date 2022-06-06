import { ADD_AUTHOR, SET_ALL_AUTHORS } from './actionTypes';

const initialState = [];

export function authorReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ALL_AUTHORS:
			return action.payload;
		case ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
}
