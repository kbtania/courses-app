import React, { useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseInfo from '../CourseInfo/CourseInfo';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Courses() {
	const navigate = useNavigate();
	const [courses, setCourses] = useState(mockedCoursesList);
	const [searchedCourses, setSearchedCourses] = useState(mockedCoursesList);
	const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
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
		setCourses([...courses, courseObj]);
		authorObj.forEach((a) => {
			if (!allAuthors.includes(a)) {
				setAllAuthors([...allAuthors, a]);
			}
		});
		setSearchedCourses([...searchedCourses, courseObj]);
		console.log(searchedCourses);
	};
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={
						<div>
							<div className={styles.search}>
								<SearchBar handleSearch={searchCourses} />
								<div className={styles.addCourseBtn}>
									<MyButton
										clickEvent={() => {
											navigate('/courses/add');
										}}
										buttonText='Add new course'
									/>
								</div>
							</div>
							{searchedCourses.map((item) => (
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
					}
				/>
				<Route
					path='add'
					element={<CreateCourse handleAddingCourse={addCourse} />}
				/>
				<Route
					path=':courseId'
					element={
						<CourseInfo authors={allAuthors} courses={courses}></CourseInfo>
					}
				/>
			</Routes>
		</div>
	);
}

export default Courses;
