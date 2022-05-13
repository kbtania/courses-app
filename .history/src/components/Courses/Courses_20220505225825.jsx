import React, { useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';

function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [searchedCourses, setSearchedCourses] = useState([]);

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

	const searchCourses = (searchData) => {
		let filteredData = courses.filter(course => course
		['title']
			.toLowerCase()
			.includes(searchData));
		setSearchedCourses(filteredData);
		console.log(filteredData);
	};
	return (
		<div>
			<div className={styles.search}>
				<SearchBar handleSearch={searchCourses} />
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