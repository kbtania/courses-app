import React from 'react';
import { Button } from 'react-bootstrap';

function MyButton({ clickEvent, buttonText }) {
	return <Button onClick={clickEvent}>{props.buttonText}</Button>;
}

export default MyButton;
