import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { AuthInterface } from '../../interfaces/Auth.interface';

export type LoginForm ={
	email:{
		value: string
	},
	password:{
		value: string
	}
}

export function Login(){

	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
		
	};

	const sendLogin = async (email: string, password: string) => {
		try{
			const { data } = await axios.post<AuthInterface>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		}catch(e){
			if(e instanceof AxiosError){
				console.error(e);
				setError(e.response?.data.message);
			}
		}
		
	};

	return (
		<>
			<form className={styles['login-form']} onSubmit={submit}>
				<Heading>Вход</Heading>
				{error && <div className={styles['error']}>{error}</div>}
				<div className={styles['email-pass']}>
					<label htmlFor='email' className={styles['label']} >Ваш email</label>
					<Input id='email' name='email' placeholder='Email'/>
				</div>
				<div className={styles['email-pass']}>
					<label htmlFor='password' className={styles['label']} >Ваш пароль</label>
					<Input id='password' name='password' placeholder='Пароль' type='password'/>
				</div>
				<div className={styles['submit-button']}>
					<Button appearence='big'>Вход</Button>
					<span>Нет акаунта?</span>
					<Link className={styles['link']} to={'/auth/register'}>Зарегистрироватся</Link>
				</div>
			</form>
		</>);
}