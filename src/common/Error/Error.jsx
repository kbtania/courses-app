import React from 'react';
import { Alert } from 'react-bootstrap';

function Error(props) {
	return <Alert variant='danger'>{props.text}</Alert>;
}

export default Error;
