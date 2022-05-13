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
	function childToParent(childData) {
		console.log(childData);
		console.log('okk');
		//setData(childData);
	};
	return (
		<div>
			<div className={styles.search}>
				<div className={styles.addCourseBtn}>
					<MyButton buttonText='Add new course' />
				</div>
				<SearchBar childToParent={childToParent} />
			</div>
			<p>Data: {data}</p>

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