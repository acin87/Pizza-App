import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter  } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout.tsx';
import './index.css';
import { Product } from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API';
import axios from 'axios';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element:<Menu/>
			},
			{
				path: '/cart',
				element:<Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				loader: async ({ params })=>{
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '*',
		element:<Error />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);
