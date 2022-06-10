import { getCurrentUser, logInUser, logOutUser } from '../../services';
import { setUser, logIn, logOut } from './actionCreators';

export function fetchCurrentUser() {
	return (dispatch) => {
		getCurrentUser().then((user) =>
			dispatch(
				setUser({
					username: user.result.name,
					email: user.result.email,
					role: user.result.role,
				})
			)
		);
	};
}

export function fetchLogOutUser() {
	return (dispatch) => {
		logOutUser()
			.then(() => {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function fetchLogInUser(userData) {
	return (dispatch) => {
		logInUser(userData).then((data) => {
			dispatch(logIn(data.result));
			localStorage.setItem('token', data.result);
			getCurrentUser()
				.then((currentUser) => {
					dispatch(
						setUser({
							username: currentUser.result.name,
							email: currentUser.result.email,
							role: currentUser.result.role,
						})
					);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};
}
