import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm ={
	email:{
		value: string
	},
	password:{
		value: string
	}
}

export function Login(){

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const { jwt, loginErrorMsg } = useSelector((s: RootState) => s.user);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
		
	};

	useEffect(() =>{
		if(jwt){
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({email, password}));
	};

	return (
		<>
			<form className={styles['login-form']} onSubmit={submit}>
				<Heading>Вход</Heading>
				{loginErrorMsg && <div className={styles['error']}>{loginErrorMsg}</div>}
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