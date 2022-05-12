import React, { useState } from 'react';
import { Form, Row, Col, Container, ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import MyButton from '../../common/Button/Button';
import styles from './CreateCourse.module.css';
import { mockedAuthorsList } from '../../constants';

function CreateCourse({ handleAddingCourse, display }) {
	const [inputValue, setInputValue] = useState(''); // author
	const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDuration, setCourseDuration] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const addAuthor = (userInput) => {
		if (inputValue.length >= 2) {
			let author = {
				id: uuidv4(),
				name: userInput,
			};
			setAllAuthors([...allAuthors, author]);
			setInputValue('');
		}
	};
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
			console.log('len = 0');
			setCourseDuration(0);
		} else {
			setCourseDuration(minutes);
		}
	};
	function timeConvert(n) {
		let num = +n;
		let hours = num / 60;
		let rhours =
			String(Math.floor(hours)).length < 2
				? `0${String(Math.floor(hours))}`
				: String(Math.floor(hours));
		let minutes = (hours - rhours) * 60;
		let rminutes =
			String(Math.round(minutes)).length < 2
				? `0${String(Math.round(minutes))} `
				: String(Math.round(minutes));
		return `${rhours}:${rminutes}`;
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
							console.log('E.TARGET.VALUE = ', e.target.value);
							if (e.target.value.length > 0) {
								setTitle(e.target.value);
							}
						}}
					/>
					<MyButton
						clickEvent={() => {
							console.log('title=', title);
							if (
								title === '' ||
								description === '' ||
								courseAuthors.length === 0 ||
								courseDuration < 1
							) {
								alert('Please, fill all the fields');
							} else {
								handleAddingCourse(
									{
										id: uuidv4(),
										title: title,
										description: description,
										duration: courseDuration,
										creationDate: '09/05/2002',
										authors: courseAuthors.map((a) => a.id),
									},
									courseAuthors
								);
								display(false);
							}
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
										addAuthor(inputValue);
									}}
									buttonText='Create author'
								></MyButton>
							</div>
						</Form.Group>
					</Col>
					<Col md={6}>
						<p>Authors</p>

						<ListGroup className={styles.authorList}>
							{allAuthors.map((author) => {
								return (
									<ListGroup.Item
										key={author.id}
										as='li'
										className='listItem d-flex justify-content-between align-items-start'
									>
										<div className='ms-2 me-auto fw-bold'>{author.name}</div>
										<MyButton
											buttonText='Add author'
											clickEvent={(e) => {
												//setChosenAuthor(e.target.innerText);
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
								{timeConvert(courseDuration)}
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
											clickEvent={(e) => {
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
