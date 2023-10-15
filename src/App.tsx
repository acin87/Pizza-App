import { MouseEvent } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {

	//const [counter, setCounter] = useState<number>(0);

	function addCounter(event: MouseEvent) {
		console.log(event);
	}

	return (
		<>
			<Button onClick={addCounter}>BTN</Button>
			<Input/>
		</>
	);
}

export default App;
