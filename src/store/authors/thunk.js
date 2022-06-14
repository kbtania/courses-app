import { addAuthor, getAuthors } from '../../services';
import { addSomeAuthor, setAllAuthors } from './actionCreators';

export function fetchAuthor(author) {
	return (dispatch) => {
		addAuthor(author)
			.then((data) => dispatch(addSomeAuthor(data.result)))
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchAllAuthors() {
	return (dispatch) => {
		getAuthors()
			.then((data) => dispatch(setAllAuthors(data.result)))
			.catch((error) => console.log(error));
	};
}
