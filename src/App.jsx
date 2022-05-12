import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Container } from 'react-bootstrap';

function App() {
	return (
		<div className='App'>
			<Container>
				<Header />
				<Courses />
			</Container>
		</div>
	);
}
export default App;
