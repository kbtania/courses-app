import React, { useState } from 'react';

import { InputGroup, FormControl } from 'react-bootstrap';
import styles from './SearchBar.module.css';

import MyButton from '../../../../common/Button/Button';

function SearchBar(props) {
	const [userSearch, setUserSearch] = useState('');

	return {
		render:
			(
				<InputGroup className={styles.searchBar}>
					<FormControl
						onChange={(event) => {
							setUserSearch(event.target.value);
						}}
						placeholder='Enter course name or id...'
						aria-describedby='basic-addon2'
					/>
					<MyButton buttonText='Search' />
				</InputGroup>
			)
	};
}

export default SearchBar;
