import { coursesReducer } from '../reducer';

test('courseReducer should return the initial state', () => {
	expect(coursesReducer(undefined, {})).toEqual([]);
});

test('courseReducer reducer should handle SAVE_COURSE and returns new state', () => {
	expect(
		coursesReducer(
			[
				{
					title: 'React Course',
				},
			],
			{
				type: 'ADD_COURSE',
				payload: {
					title: 'Vue.js Course',
				},
			}
		)
	).toEqual([
		{
			title: 'React Course',
		},
		{
			title: 'Vue.js Course',
		},
	]);
});

test('courseReducer should handle GET_COURSES and returns new state', () => {
	expect(
		coursesReducer([], {
			type: 'SET_ALL_COURSES',
			payload: [
				{
					title: 'React Course',
					description: 'React Course for Beginners',
					duration: 200,
				},
			],
		})
	).toEqual([
		{
			title: 'React Course',
			description: 'React Course for Beginners',
			duration: 200,
		},
	]);
});
