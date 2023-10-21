import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success(){

	const navigate = useNavigate();

	return(
		<div className={styles['success']}>
			<img src="/public/pizza.png" alt="Pizza" />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearence="big" onClick={()=> navigate('/')}>Селать новый</Button>
		</div>
	);
}