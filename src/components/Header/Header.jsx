import React from 'react';

import Logo from './components/Logo/Logo';
import MyButton from '../../common/Button/Button';

import styles from './Header.module.css';

import { Navbar, Nav } from 'react-bootstrap';

function Header() {
	return (
		<>
			<Navbar collapseOnSelect expand='sm' className={styles.navbar}>
				{/*<Col>*/}
				<Navbar.Brand className='mr-5'>
					<Logo />
				</Navbar.Brand>
				{/*</Col>*/}
				{/*<Col>*/}
				<Navbar.Toggle aria-controls='responsive-navbar-nav'></Navbar.Toggle>
				<Navbar.Collapse
					id='responsive-navbar-nav'
					className='f-flex justify-content-end'
				>
					<Nav>
						<Nav.Link className='mr-4'>Joe Doe</Nav.Link>
						<MyButton buttonText='Logout'></MyButton>
					</Nav>
				</Navbar.Collapse>
				{/*</Col>*/}
			</Navbar>
		</>
	);
}

export default Header;
