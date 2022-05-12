import React from 'react';

import { Card } from 'react-bootstrap';
import {
	BsFillPersonFill,
	BsFillClockFill,
	BsFillCalendar2RangeFill,
} from 'react-icons/bs';

import MyButton from '../../../../common/Button/Button';
import styles from './CourseCard.module.css';

function CourseCard(props) {
	return (
		<>
			<Card className='text-center mb-4'>
				<Card.Body>
					<Card.Title>{props.course.title}</Card.Title>
					<Card.Text>{props.course.description}</Card.Text>
					<MyButton buttonText='Show course'></MyButton>
				</Card.Body>

				<Card.Footer>
					<div className={styles.author}>
						<span className={styles.details}>
							{' '}
							<BsFillPersonFill />
							Authors:{' '}
						</span>
						{props.author}
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
