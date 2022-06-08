import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';

import { logOut, logIn } from '../../store/user/actionCreators';
import { userSelector } from '../../store/user/selector';

import styles from './Header.module.css';

function Header() {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const [btnText, setBtnText] = useState('Logout');
	const navigate = useNavigate();
	const currentLocation = useLocation();
	useEffect(() => {
		const TOKEN = localStorage.getItem('token');
		if (TOKEN) {
			const savedUserData = JSON.parse(localStorage.getItem('user'));
			setBtnText('Logout');
			dispatch(logIn({ token: TOKEN, ...savedUserData }));
		}
	}, []);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setBtnText('Log out');
		} else {
			setBtnText('Log In');
		}
		console.log('check token');
	});
	useEffect(() => {
		const availableRoutes = ['/registration', '/login'];
		const checkRoute = availableRoutes.filter((path) =>
			currentLocation.pathname.includes(path)
		).length;
		if (checkRoute && user.isLoggedIn) {
			navigate('/courses', { replace: true });
		}
		if (!checkRoute && !user.isLoggedIn) {
			navigate('/login');
		}
	}, [currentLocation, navigate, user]);
	function logUserOut() {
		setBtnText('haha');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(logOut({ isLoggedIn: false }));
		console.log(user);
		navigate('/login');
	}
	return (
		<>
			<Navbar collapseOnSelect expand='sm' className={styles.navbar}>
				<Navbar.Brand className='mr-5'>
					<Logo />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav'></Navbar.Toggle>
				<Navbar.Collapse
					id='responsive-navbar-nav'
					className='f-flex justify-content-end'
				>
					<Nav>
						<div className={styles.user}>
							<Nav.Link className={styles.user}>{user.username}</Nav.Link>
							<MyButton
								className={styles.user}
								buttonText={btnText}
								clickEvent={() => {
									logUserOut();
								}}
							></MyButton>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default Header;
