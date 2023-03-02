import { Link } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';

import styles from './sign-in.module.css';

export const SignIn = () => (
	<form className={styles.form}>
		<h2 className={styles.form__title}>Вход в личный кабинет</h2>
		<div className={styles.form__inputs}>
			<input type='text' className={styles.input} placeholder='Логин' />
			<input type='password' className={styles.input} placeholder='Пароль' />
		</div>
		<Link className={styles.form__restore}>Забыли логин или пароль?</Link>
		<button className={styles.form__btn} type='button'>
			вход
		</button>
		<div className={styles.from__text}>
			<Link className={styles.form__account}>Нет учётной записи?</Link>
			<Link to='/registration' className={styles.form__action}>Регистрация {IconArrow}</Link>
		</div>
	</form>
);
