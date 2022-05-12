import React, { useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';

function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [searchedCourses, setSearchedCourses] = useState(mockedCoursesList);
	const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showCoursesList, setShowCoursesList] = useState(true);
	function getAuthor(course) {
		let names = [];
		course.authors.forEach((authorId) => {
			allAuthors.forEach((author) => {
				if (author.id === authorId) {
					names.push(`${author.name}`);
				}
			});
		});
		return names.join(', ');
	}

	const searchCourses = (searchData) => {
		let filteredData = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(searchData) ||
				course.id.toLowerCase().includes(searchData)
		);
		setSearchedCourses(filteredData);
	};
	const addCourse = (courseObj, authorObj) => {
		console.log(courseObj);
		setCourses([...courses, courseObj]);
		authorObj.forEach((a) => {
			if (!allAuthors.includes(a)) {
				setAllAuthors([...allAuthors, a]);
			}
		});
		setSearchedCourses([...searchedCourses, courseObj]);
	};
	return (
		<div>
			<div className={styles.search}>
				<SearchBar handleSearch={searchCourses} />
				<div className={styles.addCourseBtn}>
					<MyButton
						clickEvent={() => {
							setShowCreateForm(true);
							setShowCoursesList(false);
						}}
						buttonText='Add new course'
					/>
				</div>
			</div>
			{showCreateForm && (
				<CreateCourse
					display={() => {
						setShowCreateForm(false);
						setShowCoursesList(true);
					}}
					handleAddingCourse={addCourse}
				></CreateCourse>
			)}
			{showCoursesList &&
				searchedCourses.map((item) => (
					<CourseCard
						key={item.id}
						course={item}
						author={getAuthor(item)}
					></CourseCard>
				))}
			{searchedCourses.length === 0 && (
				<div className={styles.noData}>No data</div>
			)}
		</div>
	);
}

export default Courses;
