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

import { coursesSelector } from '../../store/courses/selector';
import { userSelector } from '../../store/user/selector';

import styles from './Courses.module.css';
import { fetchGetCourses } from '../../store/courses/thunk';
import { fetchAllAuthors } from '../../store/authors/thunk';

export const LocationDisplay = () => {
	return <div data-testid='course-form'></div>;
};

function Courses() {
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
								<div
									className={styles.addCourseBtn}
									data-testid='add-course-button'
								>
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
							<div data-testid='courses'>
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
			<LocationDisplay />
		</div>
	);
}

export default Courses;
