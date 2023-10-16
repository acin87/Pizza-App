import { Link } from 'react-router-dom';

export function Error(){
	return (
		<>
			<div>
				<Link to='/'>Menu</Link>
				<Link to='/cart'>Корзина</Link>
			</div>	
				Error
		</>);
}