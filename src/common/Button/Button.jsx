import React from 'react';
import { Button } from 'react-bootstrap';

function MyButton({ clickEvent, buttonText }) {
	return <Button onClick={clickEvent}>{buttonText}</Button>;
}

export default MyButton;
