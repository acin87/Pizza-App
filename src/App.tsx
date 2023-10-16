import { MouseEvent } from 'react';
import './App.css';
import {Button} from './components/Button/Button';
import {Input} from './components/Input/Input';
import { Link } from 'react-router-dom';





function App() {

	//const [counter, setCounter] = useState<number>(0);

	function addCounter(event: MouseEvent) {
		console.log(event);
	}

	return (
		<>
			<Button onClick={addCounter}>Применить</Button>
			<Button appearence='big' onClick={addCounter}>Оформить</Button>
			<Input placeholder='Email'/>
			<div>
				<Link to='/'>Menu</Link>
				<Link to='/cart'>Корзина</Link>
			</div>
			
		</>
	);
}

export default App;
