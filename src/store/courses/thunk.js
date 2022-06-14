import {
	addSomeCourse,
	deleteSomeCourse,
	setAllCourses,
	updateSomeCourse,
} from './actionCreators';
import {
	addCourse,
	deleteCourse,
	updateCourse,
	getCourses,
} from '../../services';

export function fetchGetCourses() {
	return (dispatch) => {
		getCourses()
			.then((data) => {
				dispatch(setAllCourses(data.result));
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchCreateCourse(course) {
	return (dispatch) => {
		addCourse(course)
			.then((data) => {
				dispatch(addSomeCourse(data.result));
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchDeleteCourse(id) {
	return (dispatch) => {
		deleteCourse(id)
			.then(() => {
				dispatch(deleteSomeCourse(id));
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchUpdateCourse(id, updatedCourse) {
	return (dispatch) => {
		updateCourse(id, updatedCourse)
			.then((data) => {
				dispatch(updateSomeCourse(data.result));
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
