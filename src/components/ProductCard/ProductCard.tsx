import { Link } from 'react-router-dom';
import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { MouseEvent } from 'react';
import { cartActions } from '../../store/cart.slice';

export function ProductCard(props: ProductCardProps){

	const dispatch = useDispatch<AppDispath>();

	const add = (e: MouseEvent)=>{
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>
					<div className={styles['price']}>
						{ props.price }&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="/public/cart-button-icon.svg" alt="Иконка корзины" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="/star-icon.svg" alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{ props.name }</div>
					<div className={styles['description']}>{ props.description }</div>
				</div>
			</div>
		</Link>
	);
}