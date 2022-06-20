import React from 'react';
import styles from './Logo.module.css';

function Logo(props) {
	return (
		<img
			data-testid='logo'
			className={styles.logo}
			src='https://logos-download.com/wp-content/uploads/2019/06/Epam_Systems_Logo.png'
			alt='Logo'
		/>
	);
}

export default Logo;
