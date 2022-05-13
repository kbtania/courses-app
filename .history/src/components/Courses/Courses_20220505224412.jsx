import React, { useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';

function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);

	//const { render, userSearch } = SearchBar();
	function getAuthor(course) {
		let names = [];
		course.authors.forEach((authorId) => {
			mockedAuthorsList.forEach((author) => {
				if (author.id === authorId) {
					names.push(`${author.name}`);
				}
			});
		});
		return names.join(', ');
	}

	const [data, setData] = useState('');

	const childToParent = (searchData) => {
		setData(searchData);
	};
	return (
		<div>
			<div className={styles.search}>
				<SearchBar childToParent={childToParent} />
				<div className={styles.addCourseBtn}>
					<MyButton buttonText='Add new course' />
				</div>
			</div>
			{courses.map((item) => (
				<CourseCard
					key={item.id}
					course={item}
					author={getAuthor(item)}
				></CourseCard>
			))}
		</div>
	);
}

export default Courses;
