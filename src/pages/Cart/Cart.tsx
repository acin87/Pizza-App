import { useDispatch, useSelector } from 'react-redux';
import { Heading } from '../../components/Heading/Heading';
import { AppDispath, RootState } from '../../store/store';
import { CartItem } from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../../interfaces/product.interfaces';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DILIVERY_FEE = 196;

export function Cart() {
	const [cartProducts, setCardProducts] = useState<ProductInterface[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

	const getItem = async (id: number) => {
		const { data } = await axios.get<ProductInterface>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const finalPrice = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, i) => acc += i, 0);

	const checkout = async ()=>{
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions.clean());
		navigate('/success');
	};

	return <>
		<Heading className={styles['heading']}>Корзина</Heading>
		{items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={i.id} count={i.count} {...product}/>;
		})}
		<div className={styles['line']}>
			<div className={styles['text']}>Итог</div>
			<div className={styles['price']}> {finalPrice} &nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Доставка</div>
			<div className={styles['price']}>{DILIVERY_FEE} &nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']} />
		<div className={styles['line']}>
			<div className={styles['text']}>Итог: <span className={styles['total-count']}>({items.length})</span> </div>
			<div className={styles['price']}>{finalPrice + DILIVERY_FEE} &nbsp;<span>₽</span> </div>
		</div>
		<div className={styles['checkout']}>
			<Button appearence="big" onClick={checkout}>оформить</Button>
		</div>
	</>;
}