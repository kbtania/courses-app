import React, { useEffect, useState } from 'react';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';

import styles from './Header.module.css';

import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	useEffect(() => {
		if (localStorage.getItem('user')) {
			let name = JSON.parse(localStorage.getItem('user')).user.name;
			setUserName(name);
		}
	});
	const logOut = () => {
		localStorage.removeItem('user');
		setUserName('');
		navigate('/login');
	};
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
						{localStorage.getItem('user') && (
							<div className={styles.user}>
								<Nav.Link className={styles.user}>{userName}</Nav.Link>
								<MyButton
									className={styles.user}
									buttonText='Logout'
									clickEvent={() => logOut()}
								></MyButton>
							</div>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}

export default Header;
