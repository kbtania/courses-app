import React, { useEffect, useState } from 'react';

import styles from './Courses.module.css';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import MyButton from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseInfo from '../CourseInfo/CourseInfo';

import { Routes, Route, useNavigate } from 'react-router-dom';

import { getCourses, getAuthors } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCourses } from '../../store/courses/actionCreators';
import { setAllAuthors } from '../../store/authors/actionCreators';
import { coursesSelector } from '../../store/courses/selector';
function Courses() {
	const navigate = useNavigate();
	//const [courses, setCourses] = useState(mockedCoursesList);
	//const [searchedCourses, setSearchedCourses] = useState(mockedCoursesList);
	//const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);

	const courses = useSelector(coursesSelector);
	const dispatch = useDispatch();
	// function getAuthor(course) {
	// 	let names = [];
	// 	course.authors.forEach((authorId) => {
	// 		allAuthors.forEach((author) => {
	// 			if (author.id === authorId) {
	// 				names.push(`${author.name}`);
	// 			}
	// 		});
	// 	});
	// 	return names.join(', ');
	// }

	// const searchCourses = (searchData) => {
	// 	let filteredData = courses.filter(
	// 		(course) =>
	// 			course.title.toLowerCase().includes(searchData) ||
	// 			course.id.toLowerCase().includes(searchData)
	// 	);
	// 	setSearchedCourses(filteredData);
	// };
	// const addCourse = (courseObj, authorObj) => {
	// 	setCourses([...courses, courseObj]);
	// 	authorObj.forEach((a) => {
	// 		if (!allAuthors.includes(a)) {
	// 			setAllAuthors([...allAuthors, a]);
	// 		}
	// 	});
	// 	setSearchedCourses([...searchedCourses, courseObj]);
	// 	console.log(searchedCourses);
	// };
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		getAuthors()
			.then((authors) => dispatch(setAllAuthors(authors.result)))
			.catch((error) => console.log(error));
		getCourses()
			.then((courses) => dispatch(setAllCourses(courses.result)))
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={
						<div>
							<div className={styles.search}>
								<SearchBar handleSearch={setSearchValue} />
								<div className={styles.addCourseBtn}>
									<MyButton
										clickEvent={() => {
											navigate('/courses/add');
										}}
										buttonText='Add new course'
									/>
								</div>
							</div>
							{/*{searchedCourses.map((item) => (*/}
							{/*	<CourseCard*/}
							{/*		key={item.id}*/}
							{/*		course={item}*/}
							{/*		author={getAuthor(item)}*/}
							{/*	></CourseCard>*/}
							{/*))}*/}
							{/*{searchedCourses.length === 0 && (*/}
							{/*	<div className={styles.noData}>No data</div>*/}
							{/*)}*/}
							{courses
								.filter((course) =>
									`${course.title} ${course.id}`
										.toLocaleLowerCase()
										.includes(searchValue)
								)
								.map((course) => (
									<CourseCard key={course.id} course={course}></CourseCard>
								))}
						</div>
					}
				/>
				<Route path='add' element={<CreateCourse />}></Route>
				<Route
					path=':courseId'
					element={<CourseInfo courses={courses}></CourseInfo>}
				></Route>

				{/*<Route*/}
				{/*	path='add'*/}
				{/*	element={<CreateCourse handleAddingCourse={addCourse} />}*/}
				{/*/>*/}
				{/*<Route*/}
				{/*	path=':courseId'*/}
				{/*	element={*/}
				{/*		<CourseInfo authors={allAuthors} courses={courses}></CourseInfo>*/}
				{/*	}*/}
				{/*/>*/}
			</Routes>
		</div>
	);
}

export default Courses;
