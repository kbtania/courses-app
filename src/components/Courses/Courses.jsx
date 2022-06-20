import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import MyButton from '../../common/Button/Button';
import CourseForm from '../CourseForm/CourseForm';
import CourseInfo from '../CourseInfo/CourseInfo';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { getCourses, getAuthors } from '../../services';
import { setAllCourses } from '../../store/courses/actionCreators';
import { setAllAuthors } from '../../store/authors/actionCreators';
import { coursesSelector } from '../../store/courses/selector';
import { authorsSelector } from '../../store/authors/selectors';
import { userSelector } from '../../store/user/selector';

import styles from './Courses.module.css';
import { fetchCurrentUser } from '../../store/user/thunk';
import { fetchGetCourses } from '../../store/courses/thunk';
import { fetchAllAuthors } from '../../store/authors/thunk';

function Courses() {
	// const navigate = useNavigate();
	// const courses = useSelector(coursesSelector);
	// const authors = useSelector(authorsSelector);
	// const user = useSelector(userSelector);
	// const dispatch = useDispatch();
	// const [searchValue, setSearchValue] = useState('');
	// useEffect(() => {
	// 	dispatch(fetchAllAuthors());
	// 	getCourses()
	// 		.then((courses) => dispatch(setAllCourses(courses.result)))
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);
	const courses = useSelector(coursesSelector);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		dispatch(fetchAllAuthors());
		dispatch(fetchGetCourses());
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
									{user.role === 'admin' && (
										<MyButton
											clickEvent={() => {
												navigate('/courses/add');
											}}
											buttonText='Add new course'
										/>
									)}
								</div>
							</div>
							{courses
								.filter((course) =>
									`${course.title} ${course.id}`
										.toLocaleLowerCase()
										.includes(searchValue)
								)
								.map((course) => (
									<CourseCard key={uuidv4()} course={course}></CourseCard>
								))}
						</div>
					}
				/>
				<Route
					path='add'
					element={
						<PrivateRoute
							childComponent={<CourseForm />}
							userPath='/courses'
						></PrivateRoute>
					}
				></Route>
				<Route
					path=':courseId'
					element={<CourseInfo courses={courses}></CourseInfo>}
				></Route>
				<Route
					path='update/:courseId'
					element={
						<PrivateRoute
							childComponent={<CourseForm />}
							userPath='/courses'
						></PrivateRoute>
					}
				></Route>
			</Routes>
		</div>
	);
}

export default Courses;
