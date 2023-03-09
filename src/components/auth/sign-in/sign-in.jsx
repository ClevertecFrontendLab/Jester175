import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';
import { IconEyeClose, IconEyeOpen } from 'assets/images/auth/icons';
import { fetchLogin } from 'store/async-actions/async-actions';

import styles from './sign-in.module.css';

export const SignIn = () => {
	const { register, handleSubmit } = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [toggle, setToogle] = useState(false);
	const authStatus = useSelector((state) => state.auth.auth);

	const onSubmit = async (data) => {
		dispatch(fetchLogin(data));
	};

	useEffect(() => {
		if (authStatus.authorized) {
			navigate('/books/all');
		}
		if (authStatus.status !== 400 && authStatus.status !== 200 && authStatus.status)
			navigate('/response');
	}, [authStatus, navigate]);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.form__title}>Вход в личный кабинет</h2>
			<div className={styles.form__inputs}>
				<div className={styles.wrapper__input}>
					<input
						{...register('identifier', {
							required: true,
						})}
						type='text'
						className={`${styles.input} ${
							authStatus.status === 400 ? styles.inputError : ''
						}`}
						placeholder='Логин'
					/>
				</div>
				<div className={styles.wrapper__input}>
					<input
						{...register('password', {
							required: true,
						})}
						type={toggle ? 'text' : 'password'}
						className={`${styles.input} ${
							authStatus.status === 400 ? styles.inputError : ''
						}`}
						placeholder='Пароль'
					/>
					<button className={styles.form__eye} type='button' onClick={() => setToogle(!toggle)}>
						{toggle ? IconEyeOpen : IconEyeClose}
					</button>
				</div>
			</div>
			{authStatus.status === 400 ? (
				<p className={styles.loginError}>Неверный логин или пароль!</p>
			) : (
				''
			)}
			{authStatus.status === 400 ? (
				<Link to='forgot-pass' className={styles.form__restore}>
					Восстановить?
				</Link>
			) : (
				<Link to='forgot-pass' className={styles.form__restore}>
					Забыли логин или пароль?
				</Link>
			)}
			<button className={styles.form__btn} type='submit'>
				вход
			</button>
			<div className={styles.from__text}>
				<Link className={styles.form__account}>Нет учётной записи?</Link>
				<Link to='/registration' className={styles.form__action}>
					Регистрация {IconArrow}
				</Link>
			</div>
		</form>
	);
};
