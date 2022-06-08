import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import MyButton from '../../common/Button/Button';
import Error from '../../common/Error/Error';

import styles from './Registration.module.css';

function Registration(props) {
	const [userRegisterData, setUserRegisterData] = useState({});
	const [displayError, setDisplayError] = useState(false);
	const URL = 'http://localhost:4000';
	let navigate = useNavigate();
	async function fetchData(route, body) {
		return await fetch(`${URL}${route}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());
	}
	async function handleRegister() {
		const registerInformation = await fetchData('/register', userRegisterData);
		if (registerInformation.successful) {
			navigate('/login', { replace: true });
		} else {
			setDisplayError(true);
		}
	}
	return (
		<div className={styles.form}>
			<p className={styles.title}>Registration</p>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicName'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						onChange={(e) =>
							setUserRegisterData({ ...userRegisterData, name: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={(e) =>
							setUserRegisterData({
								...userRegisterData,
								email: e.target.value,
							})
						}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						onChange={(e) =>
							setUserRegisterData({
								...userRegisterData,
								password: e.target.value,
							})
						}
					/>
				</Form.Group>
				<MyButton
					buttonText='Registration'
					clickEvent={(e) => {
						e.preventDefault();
						handleRegister();
					}}
				/>
			</Form>
			<p>
				If you have an account you can
				<Link to='/login'> Login</Link>
			</p>
			{displayError && <Error text='Wrong Login Input. Try again!' />}
		</div>
	);
}

export default Registration;
