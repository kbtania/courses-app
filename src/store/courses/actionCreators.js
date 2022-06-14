import {
	SET_ALL_COURSES,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export function setAllCourses(courses) {
	return {
		type: SET_ALL_COURSES,
		payload: courses,
	};
}

export function addSomeCourse(newCourse) {
	return {
		type: ADD_COURSE,
		payload: newCourse,
	};
}

export function deleteSomeCourse(id) {
	return {
		type: DELETE_COURSE,
		payload: id,
	};
}

export function updateSomeCourse(updatedCourse) {
	return {
		type: UPDATE_COURSE,
		payload: updatedCourse,
	};
}
