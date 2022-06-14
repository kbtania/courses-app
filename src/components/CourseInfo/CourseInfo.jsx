import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import styles from './CourseInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { coursesSelector } from '../../store/courses/selector';
import { authorsSelector } from '../../store/authors/selectors';
import { fetchAllAuthors } from '../../store/authors/thunk';
import { fetchGetCourses } from '../../store/courses/thunk';

function CourseInfo({ course }) {
	const { courseId } = useParams();
	const courses = useSelector(coursesSelector);
	const authors = useSelector(authorsSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllAuthors());
		dispatch(fetchGetCourses());
	}, []);

	const courseData = courses.find((course) => course.id === courseId);

	if (!courseData) {
		return <h1>No course found</h1>;
	}
	const authorsNames = courseData.authors.map((authorId) => (
		<span key={authorId}>
			{authors.find((author) => author.id === authorId)?.name + ' '}
		</span>
	));
	return (
		<div>
			<>
				<Card>
					<Card.Body>
						<Card.Title>
							<h1>{courseData.title}</h1>
						</Card.Title>
						<p className={styles.courseId}>ID: {courseId}</p>
						<hr />
						<p>
							<span className={styles.subtitle}>Duration:</span>{' '}
							{courseData.duration} minutes
						</p>
						<p>
							<span className={styles.subtitle}>Created:</span>{' '}
							{courseData.creationDate}
						</p>
						<p>
							<span className={styles.subtitle}>Authors:</span> {authorsNames}
						</p>
						<Card.Text>{courseData.description}</Card.Text>
						<Link to='/courses'>&#8249; Back to courses</Link>
					</Card.Body>
				</Card>
			</>
		</div>
	);
}

export default CourseInfo;
