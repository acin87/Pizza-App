import styles from './Product.module.css';
import axios, { AxiosError } from 'axios';
import { Link, useParams } from 'react-router-dom';
import { PREFIX } from '../../helpers/API';
import { ProductInterface } from '../../interfaces/product.interfaces';
import { MouseEvent, useEffect, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Button } from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product(){

	const params = useParams();
	const [product, setProduct] = useState<ProductInterface>();
	const [error, setError] = useState<string | undefined>();
	const dispatch = useDispatch<AppDispath>();
	
	const productLoader = async () => {
		try
		{
			const { data } = await axios.get<ProductInterface>(`${PREFIX}/products/${params.id}`);
			setProduct(data);
		}
		catch(e)
		{
			if(e instanceof AxiosError){
				setError(e.message);
			}
			return;
		}
	};

	const add = (e: MouseEvent) =>{
		e.preventDefault();
		dispatch(cartActions.add(Number(params.id)));
	};

	useEffect(()=>{
		productLoader();
	},[]);

	return (
		<>
			<div className={styles['head']}>
				<Link to={'/'} className={styles['arrow']}>
					<img src="/public/arrow.svg" alt="Иконка звезды" />
				</Link>
				<Heading className={styles['prod-name']}> {product?.name} </Heading>
				<Button className={styles['nav-btn']} onClick={add}>В корзину</Button>
			</div>
			<div className={styles['product']}>
				{error && <>{error}</>}	{/* стилизовать ошибку */}
				<div  className={styles['image-col']}>
					<img  className={styles['image']} src={product?.image} alt="" />
				</div>
				<div className={styles['product-props']}>
					<div className={styles['product-props-price']}>
						<div className={styles['text']}>Цена</div>
						<div className={styles['price']}>{product?.price}&nbsp;
							<span className={styles['currency']}>₽</span>
						</div>
					</div>
					<div className={styles['product-props-rating']}>
						<div className={styles['text']}>Рейтинг</div>
						<div className={styles['rating']}>{product?.rating}&nbsp;
							<img src="/star-icon.svg" alt="Иконка звезды" />
						</div>
					</div>
					<div className={styles['product-props-sostav']}>
						<div className={styles['sostav']}>Состав:</div>
						<ul>
							{product?.ingredients.map((i, key) =>(
								<li key={key} className={styles['ingidients']}> {i} </li>
							))}	
						</ul>
					</div>

				</div>
			</div>
		</>);
}