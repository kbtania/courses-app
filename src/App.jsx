import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
	return (
		<div className='App'>
			<Container>
				<Header />
				<Routes>
					{localStorage.user && <Route index path='/*' element={<Courses />} />}
					{!localStorage.user && <Route index path='/*' element={<Login />} />}
					<Route path='registration' element={<Registration />} />
					<Route path='login' element={<Login />} />
					<Route path='courses/*' element={<Courses />} />
					{/*<Route path='courses/add' element={<CreateCourse />} />*/}
				</Routes>
			</Container>
		</div>
	);
}
export default App;
