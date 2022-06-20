import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [],
	authors: [],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Header should have logo', async () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Header></Header>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('logo')).toBeInTheDocument();
});

test('Header should have username', async () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Header></Header>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByText('Test Name')).toBeInTheDocument();
});
