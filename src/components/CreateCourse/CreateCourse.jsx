import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Container, ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import MyButton from '../../common/Button/Button';

import { authorsSelector } from '../../store/authors/selectors';
import { addAuthor } from '../../store/authors/actionCreators';
import { addCourse } from '../../store/courses/actionCreators';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';

import styles from './CreateCourse.module.css';

function CreateCourse() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const storedAuthors = useSelector(authorsSelector);
	const [inputValue, setInputValue] = useState(''); // author
	const [courseAuthors, setCourseAuthors] = useState([]); // chosen authors
	const [courseDuration, setCourseDuration] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const checkAuthorField = () => {
		return inputValue.length < 2;
	};
	const chooseAuthor = (userChoice) => {
		if (!courseAuthors.includes(userChoice)) {
			setCourseAuthors([...courseAuthors, userChoice]);
		}
	};
	const deleteAuthor = (userChoice) => {
		setCourseAuthors(
			courseAuthors.filter((author) => author.id !== userChoice.id)
		);
	};
	const calculateCourseDuration = (minutes) => {
		if (String(minutes).length === 0) {
			setCourseDuration(0);
		} else {
			setCourseDuration(minutes);
		}
	};
	function addNewAuthor(val) {
		if (val.length !== 0) {
			const newAuthor = {
				id: uuidv4(),
				name: val,
			};
			dispatch(addAuthor(newAuthor));
		} else {
			alert('Fill the field');
		}
	}
	function addNewCourse() {
		// add course to the store
		if (
			title === '' ||
			description === '' ||
			courseAuthors.length === 0 ||
			courseDuration < 1
		) {
			alert('Please, fill all the fields');
		} else {
			const newCourse = {
				id: uuidv4(),
				title: title,
				description: description,
				duration: courseDuration,
				creationDate: dateGenerator(new Date()),
				authors: courseAuthors.map((a) => a.id),
			};
			dispatch(addCourse(newCourse));
			navigate('/courses');
		}
	}
	return (
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Title</Form.Label>
				<div className={styles.firstRow}>
					<Form.Control
						className={`${title.length < 2 ? styles.error : ''}`}
						style={{ width: '50%' }}
						type='text'
						placeholder='Enter title...'
						onChange={(e) => {
							if (e.target.value.length > 0) {
								setTitle(e.target.value);
							}
						}}
					/>
					<MyButton
						clickEvent={() => {
							addNewCourse();
						}}
						buttonText='Create course'
					></MyButton>
				</div>
			</Form.Group>
			<Form.Group controlId='floatingTextarea2' label='Comments'>
				<Form.Label>Description</Form.Label>
				<Form.Control
					className={`${description.length < 2 ? styles.error : ''}`}
					as='textarea'
					placeholder='Enter description'
					style={{ height: '100px' }}
					onChange={(e) => {
						if (e.target.value.length > 0) {
							setDescription(e.target.value);
						}
					}}
				/>
			</Form.Group>
			<Container>
				<Row>
					<Col md={6}>
						<p>Add author</p>
						<Form.Group controlId='floatingTextarea2'>
							<Form.Label>Author name</Form.Label>
							<Form.Control
								type='text'
								value={inputValue}
								placeholder='Enter author name'
								className={`${checkAuthorField() ? styles.error : ''}`}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<Form.Text
								muted
								className={`shadow-none ${
									checkAuthorField() ? '' : styles.noHint
								}`}
							>
								Author's name mush contain at least 2 symbols
							</Form.Text>
							<div className={styles.createAuthorBtn}>
								<MyButton
									clickEvent={() => {
										addNewAuthor(inputValue);
									}}
									buttonText='Create author'
								></MyButton>
							</div>
						</Form.Group>
					</Col>
					<Col md={6}>
						<p>Authors</p>

						<ListGroup className={styles.authorList}>
							{storedAuthors.map((author) => {
								return (
									<ListGroup.Item
										key={author.id}
										as='li'
										className='listItem d-flex justify-content-between align-items-start'
									>
										<div className='ms-2 me-auto fw-bold'>{author.name}</div>
										<MyButton
											buttonText='Add author'
											clickEvent={() => {
												chooseAuthor(author);
											}}
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
								min='0'
								onChange={(e) => {
									if (e.target.value > 0) {
										calculateCourseDuration(e.target.value);
									}
								}}
								placeholder='Enter duration in minutes'
							/>
						</div>
						<div className={styles.duration}>
							Duration:{' '}
							<span className={styles.durationTime}>
								{pipeDuration(courseDuration)}
							</span>
							hours
						</div>
					</Col>
					<Col md={6}>
						<p>Course authors</p>
						<p
							className={`${
								courseAuthors.length === 0 ? '' : styles.emptyAuthorsList
							}`}
						>
							Author list is empty
						</p>
						<ListGroup
							className={`${
								courseAuthors.length === 0 ? '' : styles.chosenAuthorList
							}`}
						>
							{courseAuthors.map((author) => {
								return (
									<ListGroup.Item
										key={author.id}
										as='li'
										className='listItem d-flex justify-content-between align-items-start'
									>
										<div className='ms-2 me-auto fw-bold'>{author.name}</div>
										<MyButton
											buttonText='Delete author'
											clickEvent={() => {
												deleteAuthor(author);
											}}
										/>
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

export default CreateCourse;
