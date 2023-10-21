import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import styles from './Register.module.css';
import { AppDispath, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { register, userActions } from '../../store/user.slice';
import { FormEvent, useEffect } from 'react';

export function Register(){

	const { jwt, registerErrorMsg } = useSelector((s: RootState) => s.user);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

	type RegistrForm = {
		email:{
			value: string
		},
		password:{
			value: string
		},
		name:{
			value: string
		}
	}

	const submit = async (e: FormEvent)=>{
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegistrForm;
		const { email, password, name} = target;
		dispatch(register({email: email.value, password: password.value, name: name.value}));
	};
	
	useEffect(() =>{
		if(jwt){
			navigate('/');
		}
	}, [jwt, navigate]);
	
	return (
		<>
			<form className={styles['login-form']} onSubmit={submit}>
				<Heading>Регистрация</Heading>
				{registerErrorMsg && <div className={styles['error']}>{registerErrorMsg}</div>}
				<div className={styles['email-pass']}>
					<label htmlFor='email' className={styles['label']} >Ваш email</label>
					<Input id='email' name='email' placeholder='Email'/>
				</div>
				<div className={styles['email-pass']}>
					<label htmlFor='password' className={styles['label']} >Ваш пароль</label>
					<Input id='password' name='password' placeholder='Пароль' type='password'/>
				</div>
				<div className={styles['email-pass']}>
					<label htmlFor='name' className={styles['label']} >Ваше имя</label>
					<Input id='name' name='name' placeholder='Имя' type='text'/>
				</div>
				<div className={styles['submit-button']}>
					<Button appearence='big'>Зарегистрироватся</Button>
				</div>
			</form>
		</>);
}