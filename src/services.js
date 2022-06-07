import axios from 'axios';

const URL = 'http://localhost:4000/';
const axiosInstance = axios.create({
	baseURL: URL,
});
axiosInstance.interceptors.response.use(
	(response) => Promise.resolve(response.data),
	(error) => Promise.reject(error)
);

export function logIn(userData) {
	return axiosInstance.post('/login', userData);
}

export function getCourses() {
	return axiosInstance.get('/courses/all');
}

export function getAuthors() {
	return axiosInstance.get('/authors/all');
}
