import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseForm from './components/CourseForm/CourseForm';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Container>
					<Header />
					<Routes>
						{localStorage.user && (
							<Route index path='/' element={<Courses />} />
						)}
						{!localStorage.user && <Route index path='/' element={<Login />} />}
						<Route path='registration' element={<Registration />} />
						<Route path='login' element={<Login />} />
						<Route path='courses/*' element={<Courses />} />
						{/*<Route path='courses/add' element={<CourseForm />} />*/}
					</Routes>
				</Container>
			</div>
		</Provider>
	);
}
export default App;
