import { SET_ALL_COURSES, ADD_COURSE, DELETE_COURE } from './actionTypes';

export function setAllCourses(courses) {
	return {
		type: SET_ALL_COURSES,
		payload: courses,
	};
}

export function addCourse(newCourse) {
	return {
		type: ADD_COURSE,
		payload: newCourse,
	};
}

export function deleteCourse(id) {
	return {
		type: DELETE_COURE,
		payload: id,
	};
}
