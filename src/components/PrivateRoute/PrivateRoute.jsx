import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { userSelector } from '../../store/user/selector';

export default function PrivateRoute({ childComponent, userPath }) {
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	useEffect(() => {
		if (user.role !== 'admin') {
			navigate(userPath);
		}
	});
	return <>{childComponent}</>;
}
