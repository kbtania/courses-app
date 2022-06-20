import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CourseCard from '../CourseCard';
import Courses from '../../../Courses';

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

test('CourseCard should display title', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByText('React')).toBeInTheDocument();
});

test('CourseCard should display description', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByText('Interesting React Course')).toBeInTheDocument();
});

test('CourseCard should display duration in the correct format', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByText('Duration:')).toBeInTheDocument();
});

test('CourseCard should display authors list', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('authors-list')).toBeInTheDocument();
});

test('CourseCard should display created date in the correct format', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses>
					<CourseCard />
				</Courses>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('course-created')).toBeInTheDocument();
});
