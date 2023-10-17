import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter  } from 'react-router-dom';

import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Menu } from './pages/Menu/Menu';
import { Product } from './pages/Product/Product.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Registr } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';

import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element:<Menu />
			},
			{
				path: '/cart',
				element:<Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <ErrorPage/>
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Registr/>
			}
		]
	},
	{
		path: '*',
		element:<ErrorPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
);
