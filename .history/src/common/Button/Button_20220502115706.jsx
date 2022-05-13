import React from 'react';
import { Button } from 'react-bootstrap';

function MyButton(props) {
	return <Button>{props.buttonText}</Button>;
}

export default MyButton;
