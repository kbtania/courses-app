import { combineReducers, createStore } from 'redux';
import { courseReducer } from './courses/reducer';
import { userReducer } from './user/reducer';
import { authorReducer } from './authors/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	courses: courseReducer,
	authors: authorReducer,
});
export const store = createStore(rootReducer);
