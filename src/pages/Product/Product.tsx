import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { PREFIX } from '../../helpers/API';
import { ProductInterface } from '../../interfaces/product.interfaces';
import { useEffect, useState } from 'react';

export function Product(){

	const params = useParams();
	const [product, setProduct] = useState<ProductInterface>();
	const [error, setError] = useState<string | undefined>();
	
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

	useEffect(()=>{
		productLoader();
	},[]);

	return (
		<>
			{error && <>{error}</>}	{/* стилизовать ошибку */}
			{product?.name}	{/* временно */}
		</>);
}