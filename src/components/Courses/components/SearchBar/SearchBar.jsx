import React, { useState } from 'react';

import { InputGroup, FormControl } from 'react-bootstrap';
import styles from './SearchBar.module.css';

import MyButton from '../../../../common/Button/Button';

function SearchBar({ handleSearch }) {
	const [userSearch, setUserSearch] = useState('');
	return (
		<InputGroup className={styles.searchBar}>
			<FormControl
				onChange={(event) => {
					setUserSearch(event.target.value);
					if (event.target.value.length === 0) {
						handleSearch('');
					}
				}}
				placeholder='Enter course name or id...'
				aria-describedby='basic-addon2'
			/>
			<MyButton
				buttonText='Search'
				clickEvent={() => {
					handleSearch(userSearch);
				}}
			/>
		</InputGroup>
	);
}

export default SearchBar;
