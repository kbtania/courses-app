import { ADD_AUTHOR, SET_ALL_AUTHORS } from './actionTypes';

export function setAllAuthors(authors) {
	return {
		type: SET_ALL_AUTHORS,
		payload: authors,
	};
}

export function addSomeAuthor(newAuthor) {
	return {
		type: ADD_AUTHOR,
		payload: newAuthor,
	};
}
