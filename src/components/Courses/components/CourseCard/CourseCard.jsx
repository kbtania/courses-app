import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { authorsSelector } from '../../../../store/authors/selectors';
import { deleteCourse } from '../../../../store/courses/actionCreators';
import { userSelector } from '../../../../store/user/selector';

import styles from './CourseCard.module.css';

function CourseCard(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector(authorsSelector);
	const user = useSelector(userSelector);
	useEffect(() => {
		console.log(user);
	});
	const authorsNames = props.course.authors
		.map((authorId) => authors.find((author) => author.id === authorId)?.name)
		.join(', ');

	return (
		<>
			<Card className='text-center mb-4'>
				<Card.Body>
					<Card.Title>{props.course.title}</Card.Title>
					<Card.Text>{props.course.description}</Card.Text>
					<div className={styles.btn}>
						<MyButton
							className={styles.btn}
							buttonText='Show course'
							clickEvent={(e) => navigate(`/courses/${props.course.id}`)}
						></MyButton>
					</div>
					{user.role === 'admin' && (
						<div className={styles.btnWrapper}>
							<div className={styles.btn}>
								<MyButton
									clickEvent={() => dispatch(deleteCourse(props.course.id))}
									buttonText={<BsFillTrashFill />}
								></MyButton>
							</div>
							<div className={styles.btn}>
								<MyButton buttonText={<BsFillPencilFill />}></MyButton>
							</div>
						</div>
					)}
				</Card.Body>

				<Card.Footer>
					<div className={styles.author}>
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
						{props.course.duration}
					</div>
					<div>
						<span className={styles.details}>
							{' '}
							<BsFillCalendar2RangeFill /> Created:{' '}
						</span>
						{props.course.creationDate}
					</div>
				</Card.Footer>
			</Card>
		</>
	);
}

export default CourseCard;
