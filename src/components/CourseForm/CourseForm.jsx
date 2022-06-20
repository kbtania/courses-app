import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Container, ListGroup } from 'react-bootstrap';

import MyButton from '../../common/Button/Button';

import {
	fetchCreateCourse,
	fetchUpdateCourse,
} from '../../store/courses/thunk';
import { fetchAuthor } from '../../store/authors/thunk';
import { authorsSelector } from '../../store/authors/selectors';
import { coursesSelector } from '../../store/courses/selector';
import { pipeDuration } from '../../helpers/pipeDuration';

import styles from './CourseForm.module.css';

export default function CourseForm() {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const courses = useSelector(coursesSelector);
	const [courseToEdit, setCourseToEdit] = useState(null);
	const storedAuthorsList = useSelector(authorsSelector);
	const [authorsList, setAuthorsList] = useState([]);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseTitle, setCourseTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [formattedDuration, setFormattedDuration] = useState('');

	useEffect(() => {
		if (courseId) {
			const editingCourse = courses.find((course) => course.id === courseId);
			setCourseToEdit(editingCourse);
		}
	}, [courseId]);

	useEffect(() => {
		if (courseToEdit) {
			setCourseTitle(courseToEdit.title);
			setCourseDescription(courseToEdit.description);
			setDuration(courseToEdit.duration);
			chooseAuthorsToCourse(courseToEdit.authors);
		}
	}, [courseToEdit]);

	useEffect(() => {
		const checkedAuthorsList = storedAuthorsList.reduce(
			(listAuthors, author) => {
				const checkAuthor = courseAuthorsList.find(
					(courseAuthor) => courseAuthor.id === author.id
				);
				if (!checkAuthor) {
					return [...listAuthors, author];
				} else {
					return listAuthors;
				}
			},
			[]
		);
		setAuthorsList(checkedAuthorsList);
	}, [storedAuthorsList]);

	useEffect(() => {
		setFormattedDuration(pipeDuration(duration));
	}, [duration]);

	function submitCourse(event) {
		const newCourse = {
			title: courseTitle,
			description: courseDescription,
			creationDate: new Date().toISOString(),
			duration: duration,
			authors: courseAuthorsList.map((author) => author.id),
		};
		if (
			newCourse.title.length === 0 ||
			newCourse.description.length === 0 ||
			newCourse.authors.length < 1 ||
			newCourse.duration === 0
		) {
			return alert('Please, fill all fields.');
		}
		if (courseToEdit) {
			delete newCourse.creationDate;
			dispatch(
				fetchUpdateCourse(courseToEdit.id, { ...courseToEdit, ...newCourse })
			);
			navigate('/courses');
		} else {
			dispatch(fetchCreateCourse(newCourse));
			navigate('/courses');
		}
	}
	function changeDuration(event) {
		setDuration(Number(event.target.value));
	}
	function chooseAuthorsToCourse(authorIds) {
		const authors = authorsList.filter((author) =>
			authorIds.includes(author.id)
		);
		setCourseAuthorsList(authors);
		const newAuthorsList = authorsList.filter(
			(author) => !authorIds.includes(author.id)
		);
		setAuthorsList(newAuthorsList);
	}
	function addAuthorToCourse(authorId) {
		if (!authorsList.includes(authorId)) {
			const author = authorsList.find((author) => author.id === authorId);
			setCourseAuthorsList([...courseAuthorsList, author]);
			const newAuthorsList = authorsList.filter(
				(author) => author.id !== authorId
			);
			setAuthorsList(newAuthorsList);
		}
	}
	function deleteAuthor(authorId) {
		const author = courseAuthorsList.find((author) => author.id === authorId);
		setAuthorsList([...authorsList, author]);
		const newCourseAuthorsList = courseAuthorsList.filter(
			(author) => author.id !== authorId
		);
		setCourseAuthorsList(newCourseAuthorsList);
	}
	function addNewAuthor() {
		let authorNames = storedAuthorsList.map((author) => author.name);
		let newAuthor;
		if (author.length !== 0) {
			if (authorNames.includes(author)) {
				return alert('Author already exists');
			} else {
				newAuthor = {
					name: author,
				};
			}
			console.log(storedAuthorsList);

			dispatch(fetchAuthor(newAuthor));
		} else {
			alert('Enter authors name');
		}
	}

	return (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Title</Form.Label>
				<div className={styles.firstRow}>
					<Form.Control
						className={`${courseTitle.length < 2 ? styles.error : ''}`}
						placeholder='Enter title...'
						type='text'
						defaultValue={courseToEdit?.title}
						required
						onChange={(e) => {
							if (e.target.value.length > 0) {
								setCourseTitle(e.target.value);
							}
						}}
					></Form.Control>
					<MyButton
						buttonText={(courseToEdit ? 'Update' : 'Create') + ' Course'}
						clickEvent={(e) => submitCourse(e)}
					></MyButton>
				</div>
			</Form.Group>
			<Form.Group>
				<Form.Label>Description</Form.Label>
				<Form.Control
					className={`${courseDescription.length < 2 ? styles.error : ''}`}
					as='textarea'
					placeholder='Enter description'
					style={{ height: '100px' }}
					defaultValue={courseToEdit?.description}
					onChange={(e) => {
						if (e.target.value.length > 0) {
							setCourseDescription(e.target.value);
						}
					}}
				></Form.Control>
			</Form.Group>
			<Container>
				<Row>
					<Col md={6}>
						<p>Add author</p>
						<Form.Group controlId='floatingTextarea2'>
							<Form.Label>Author name</Form.Label>
							<Form.Control
								type='text'
								required
								placeholder='Enter author name'
								className={`${author.length === 0 ? styles.error : ''}`}
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<div className={styles.createAuthorBtn}>
								<MyButton
									clickEvent={() => addNewAuthor()}
									buttonText='Create author'
								></MyButton>
							</div>
						</Form.Group>
					</Col>
					<Col md={6}>
						<p>Authors</p>
						<ListGroup className={styles.authorList}>
							{authorsList.map((author) => {
								return (
									<ListGroup.Item
										key={author.id}
										as='li'
										className='lisItem d-flex justify-content-between align-item-start'
									>
										<div className='ms-2 me-auto fw-bold'>{author.name} </div>
										<MyButton
											buttonText='Add author'
											clickEvent={() => addAuthorToCourse(author.id)}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Label>Duration</Form.Label>
						<div className={styles.firstRow}>
							<Form.Control
								style={{ width: '50%' }}
								type='number'
								placeholder='Enter duration in minutes'
								value={duration}
								onChange={changeDuration}
							></Form.Control>
						</div>
						<div className={styles.duration}>
							Duration:{' '}
							<span className={styles.durationTime}>{formattedDuration}</span>
							hours
						</div>
					</Col>
					<Col md={6}>
						<p>Course authors</p>
						<p
							className={`${
								courseAuthorsList.length === 0 ? '' : styles.emptyAuthorsList
							}`}
						>
							Author list is empty
						</p>
						<ListGroup
							className={`${
								courseAuthorsList.length === 0 ? '' : styles.chosenAuthorList
							}`}
						>
							{courseAuthorsList.map((author) => {
								return (
									<ListGroup.Item
										key={author.id}
										as='li'
										className='listItem d-flex justify-content-between align-items-start'
									>
										<div className='ms-2 me-auto fw-bold'>{author.name}</div>
										<MyButton
											buttonText='Delete author'
											clickEvent={() => deleteAuthor(author.id)}
										></MyButton>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</Form>
	);
}
