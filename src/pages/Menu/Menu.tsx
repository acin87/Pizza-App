import { ChangeEvent, useEffect, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { ProductInterface } from '../../interfaces/product.interfaces';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu(){

	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<ProductInterface[]>(`${PREFIX}/products`,{
				params: {
					name
				}
			});
			setProducts(data);
			setIsLoading(false);
			
		} catch (e) {
			//console.error(e);
			if(e instanceof AxiosError){
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};
	useEffect(()=>{
		getMenu(filter);
	}, [filter]);

	const updateFileter = (e: ChangeEvent<HTMLInputElement>)=>{
		setFilter(e.target.value);
	};
	

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' onChange={updateFileter}/>
			</div>
			<div>
				{error && <>{error}</>}	{/* силизовать ошибку */}
				{!isLoading && products.length > 0 && <MenuList products={products}/>}
				{isLoading && <div>Loading....</div>} 	{/* сделать прелоадер */}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
				
			</div>
		</>);
}
