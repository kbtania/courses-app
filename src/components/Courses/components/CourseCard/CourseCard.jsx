import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsFillClockFill,
	BsFillCalendar2RangeFill,
	BsFillTrashFill,
	BsFillPencilFill,
} from 'react-icons/bs';

import MyButton from '../../../../common/Button/Button';

import { fetchDeleteCourse } from '../../../../store/courses/thunk';
import { authorsSelector } from '../../../../store/authors/selectors';
import { userSelector } from '../../../../store/user/selector';

import styles from './CourseCard.module.css';
import { coursesSelector } from '../../../../store/courses/selector';

function CourseCard({ course }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector(authorsSelector);
	const user = useSelector(userSelector);
	const authorsNames = course.authors
		.map((authorId) => authors.find((author) => author.id === authorId)?.name)
		.join(', ');
	return (
		<>
			<Card className='text-center mb-4' data-testid='course-card'>
				<Card.Body>
					<Card.Title>{course.title}</Card.Title>
					<Card.Text>{course.description}</Card.Text>
					<div className={styles.btn}>
						<MyButton
							className={styles.btn}
							buttonText='Show course'
							clickEvent={(e) => navigate(`/courses/${course.id}`)}
						></MyButton>
					</div>
					{user.role === 'admin' && (
						<div className={styles.btnWrapper}>
							<div className={styles.btn}>
								<MyButton
									clickEvent={() => dispatch(fetchDeleteCourse(course.id))}
									buttonText={<BsFillTrashFill />}
								></MyButton>
							</div>
							<div className={styles.btn}>
								<MyButton
									clickEvent={() => navigate(`/courses/update/${course.id}`)}
									buttonText={<BsFillPencilFill />}
								></MyButton>
							</div>
						</div>
					)}
				</Card.Body>

				<Card.Footer>
					<div className={styles.author} data-testid='authors-list'>
						<span className={styles.details}>
							{' '}
							<BsFillPersonFill />
							Authors:{' '}
						</span>
						{authorsNames}
					</div>
					<div>
						<span className={styles.details}>
							{' '}
							<BsFillClockFill /> Duration:{' '}
						</span>
						{course.duration}
					</div>
					<div>
						<span className={styles.details} data-testid='course-created'>
							{' '}
							<BsFillCalendar2RangeFill /> Created:{' '}
						</span>
						{course.creationDate}
					</div>
				</Card.Footer>
			</Card>
		</>
	);
}

export default CourseCard;
