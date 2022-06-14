import {
	SET_ALL_COURSES,
	ADD_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './actionTypes';

const initialState = [];

export function coursesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ALL_COURSES:
			return action.payload;
		case ADD_COURSE:
			return [...state, action.payload];
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		case UPDATE_COURSE:
			const oldCourseIdx = state.findIndex(
				(course) => course.id === action.payload.id
			);
			const newState = [...state];
			newState[oldCourseIdx] = action.payload;
			return newState;
		default:
			return state;
	}
}
