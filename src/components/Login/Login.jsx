import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import MyButton from '../../common/Button/Button';
import Error from '../../common/Error/Error';

import { useDispatch } from 'react-redux';
import { logInUser } from '../../services';
import { logIn } from '../../store/user/actionCreators';

import styles from '../Registration/Registration.module.css';

function Login(props) {
	const [userLoginData, setUserLoginData] = useState({});
	const [displayError, setDisplayError] = useState(false);
	const URL = 'http://localhost:4000';
	const dispatch = useDispatch();
	const navigate = useNavigate();
	async function fetchData(route, body) {
		return await fetch(`${URL}${route}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());
	}
	function handleLogin(e) {
		const email = userLoginData.email;
		const password = userLoginData.password;
		console.log('LOGIN>>>');
		logInUser({ email, password })
			.then((response) => {
				localStorage.setItem('token', response.result);
				localStorage.setItem('user', JSON.stringify(response.user));
				dispatch(logIn({ token: response.result, ...response.user }));
				navigate('/courses');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>Login</p>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={(e) =>
							setUserLoginData({ ...userLoginData, email: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						onChange={(e) =>
							setUserLoginData({ ...userLoginData, password: e.target.value })
						}
					/>
				</Form.Group>
				<MyButton
					buttonText='Login'
					clickEvent={(e) => {
						e.preventDefault();
						handleLogin(e);
					}}
				/>
			</Form>
			<p>
				If you have an account you can
				<Link to='/registration'> Registration</Link>
			</p>
			{displayError && <Error text='Wrong Login Input. Try again!' />}
		</div>
	);
}

export default Login;
