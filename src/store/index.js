import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { coursesReducer } from './courses/reducer';
import { userReducer } from './user/reducer';
import { authorReducer } from './authors/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
