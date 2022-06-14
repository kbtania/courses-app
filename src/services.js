import axios from 'axios';

const URL = 'http://localhost:4000/';
const axiosInstance = axios.create({
	baseURL: URL,
});
axiosInstance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => Promise.resolve(response.data),
	(error) => Promise.reject(error)
);

// --- User ---
export function logInUser(userData) {
	return axiosInstance.post('/login', userData);
}

export function logOutUser() {
	return axiosInstance.delete('/logout');
}

export function getCurrentUser() {
	return axiosInstance.get('/users/me');
}

// --- Courses ---
export function getCourses() {
	return axiosInstance.get('/courses/all');
}

export function addCourse(course) {
	return axiosInstance.post('/courses/add', course);
}

export function updateCourse(courseId, updatedCourse) {
	return axiosInstance.put(`/courses/${courseId}`, updatedCourse);
}

export function deleteCourse(courseId) {
	return axiosInstance.delete(`/courses/${courseId}`);
}

// --- Author ---
export function getAuthors() {
	return axiosInstance.get('/authors/all');
}

export function addAuthor(author) {
	return axiosInstance.post('/authors/add', author);
}
