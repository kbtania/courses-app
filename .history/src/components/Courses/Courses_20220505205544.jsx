import React, { useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';

function Courses(props) {
	const [courses, setCourses] = useState(mockedCoursesList);

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
	return (
		<div>
			<div className={styles.search}>
				{SearchBar.render}
				{/* <SearchBar></SearchBar> */}
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
