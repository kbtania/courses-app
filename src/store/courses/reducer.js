import { SET_ALL_COURSES, ADD_COURSE, DELETE_COURE } from './actionTypes';

const initialState = [];

export function coursesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ALL_COURSES:
			return action.payload;
		case ADD_COURSE:
			return [...state, action.payload];
		case DELETE_COURE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
}
