import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import CourseCard from '../../Courses/components/CourseCard/CourseCard';
import CourseForm from '../../CourseForm/CourseForm';
import Courses from '../Courses';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [
		{
			title: 'React',
			description: 'Interesting React Course',
			creationDate: '10/11/2020',
			duration: 210,
			authors: [
				'df32994e-b23d-497c-9e4d-84e4dc02882f',
				'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			],
		},
	],
	authors: [
		{
			id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			name: 'Vasiliy Dobkin',
		},
		{
			id: 'f762978b-61eb-4096-812b-ebde22838167',
			name: 'Nicolas Kim',
		},
		{
			id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
			name: 'Anna Sidorenko',
		},
		{
			id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			name: 'Valentina Larina',
		},
	],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Courses should display amount of CourseCard equal length of courses array', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	const courseCards = screen.getAllByTestId('course-card');
	expect(courseCards.length).toEqual(mockedStore.getState().courses.length);
});

test('Courses should display Empty container if courses array length is 0.', () => {
	const mockedState = {
		user: {},
		courses: [],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses></Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('courses')).toBeEmptyDOMElement();
});

test('CourseForm should be showed after a click on a button "Add new course"', async () => {
	const history = createMemoryHistory();
	render(
		<Provider store={mockedStore}>
			<Router location={history.location} navigator={history}>
				<Courses />
			</Router>
		</Provider>
	);
	const button = screen.getByTestId('add-course-button');
	userEvent.click(button);
	const courseForm = screen.getByTestId('course-form');
	expect(courseForm).toBeInTheDocument();
});
