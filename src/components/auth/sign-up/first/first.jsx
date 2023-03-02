import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';
import { IconEyeClose, IconEyeOpen, IconOkey } from 'assets/images/auth/icons';

import styles from '../sign-up.module.css';

export const SignUpFirstStep = ({ changeStep }) => {
	const refTipLogin = useRef();
	const refTipPassword = useRef();

	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm({ mode: 'onBlur' });

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [toggle, setToogle] = useState(false);
	const [check, setCheck] = useState(false);

	const [isLoginValid, setIsLoginValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	useMemo(() => {
		if (isLoginValid && isPasswordValid && watch('login') && watch('password')) {
			setDisabled(false);
		}
	}, [isLoginValid, isPasswordValid, watch]);

	useEffect(() => {
		const subscription = watch((value) => {
			setLogin(value.login);
			setPassword(value.password);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	// eslint-disable-next-line complexity
	const validLogin = (query) => {
		if (!query || !query.length) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина латинский алфавит и цифры
				</p>
			);
		}

		const number = query?.match(/[0-9]/);
		const enLetter = query?.match(/[A-Za-z]/);
		const ruLetter = query?.match(/[А-яа-я]/);

		if (!enLetter && number && ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина
					<mark style={{ color: '#F42C4F', background: 'none' }}> латинский алфавит</mark> и цифры
				</p>
			);
		}

		if (!enLetter && !number && ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip} style={{ color: '#F42C4F' }}>
					Используйте для логина латинский алфавит и цифры
				</p>
			);
		}

		if (enLetter && !number && ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip} style={{ color: '#F42C4F' }}>
					Используйте для логина латинский алфавит и цифры
				</p>
			);
		}

		if (enLetter && number && ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина <mark style={{ color: '#F42C4F', background: 'none' }}> латинский алфавит</mark> и
					цифры
				</p>
			);
		}

		if (enLetter && number && !ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина латинский алфавит и цифры
				</p>
			);
		}

		if (enLetter && !number && !ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина латинский алфавит и<mark style={{ color: '#F42C4F', background: 'none' }}> цифры</mark>
				</p>
			);
		}

		if (!enLetter && number && !ruLetter) {
			return (
				<p ref={refTipLogin} className={styles.tooltip}>
					Используйте для логина <mark style={{ color: '#F42C4F', background: 'none' }}> латинский алфавит</mark> и
					цифры
				</p>
			);
		}

		return (
			<p ref={refTipLogin} className={styles.tooltip}>
				<mark style={{ color: '#F42C4F', background: 'none' }}>Используйте для логина латинский алфавит и цифры</mark>
			</p>
		);
	};

	const onBlurLogin = (query) => {
		if (query.match(/^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/)) {
			setIsLoginValid(true);
		} else {
			setIsLoginValid(false);
			refTipLogin.current.style.color = '#F42C4F';
		}
	};

	const onBlurPassword = (query) => {
		if (query.match(/(?=.*[A-Z])(?=.*[0-9])[a-zA-ZА-Яа-я0-9]{8,}/)) {
			setIsPasswordValid(true);
            setCheck(true);
		} else {
			setIsPasswordValid(false);
            setCheck(false);
			refTipPassword.current.style.color = '#F42C4F';
		}
	};

	const onFocusLogin = () => {
		refTipLogin.current.style.color = '#a7a7a7';
	};

	const onFocusPassword = () => {
		refTipPassword.current.style.color = '#a7a7a7';
	};

	// eslint-disable-next-line complexity
	const validPassword = (query) => {
		if (!query || !query.length) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль не менее 8 символов, с заглавной буквой и цифрой
				</p>
			);
		}

		const number = query?.match(/[0-9]{1,}/);
		const passwordLength = query.length > 7;
		const upperLetter = query?.match(/[A-ZА-Я]{1,}/);

		if (number && !passwordLength && upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль <mark style={{ color: '#F42C4F', background: 'none' }}> не менее 8 символов</mark>, с заглавной буквой
					и цифрой
				</p>
			);
		}

		if (number && passwordLength && !upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль не менее 8 символов,<mark style={{ color: '#F42C4F', background: 'none' }}> с заглавной буквой </mark>и
					цифрой
				</p>
			);
		}

		if (number && passwordLength && upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль не менее 8 символов, с заглавной буквой и цифрой
				</p>
			);
		}

		if (number && !passwordLength && !upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль <mark style={{ color: '#F42C4F', background: 'none' }}> не менее 8 символов</mark>,
					<mark style={{ color: '#F42C4F', background: 'none' }}> с заглавной буквой </mark>и цифрой
				</p>
			);
		}

		if (!number && passwordLength && upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль не менее 8 символов, с заглавной буквой и
					<mark style={{ color: '#F42C4F', background: 'none' }}> цифрой</mark>
				</p>
			);
		}

		if (!number && passwordLength && !upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль не менее 8 символов,<mark style={{ color: '#F42C4F', background: 'none' }}> с заглавной буквой </mark>и
					<mark style={{ color: '#F42C4F', background: 'none' }}> цифрой</mark>
				</p>
			);
		}

		if (!number && !passwordLength && upperLetter) {
			return (
				<p className={styles.tooltip} ref={refTipPassword}>
					Пароль<mark style={{ color: '#F42C4F', background: 'none' }}> не менее 8 символов </mark>, с заглавной буквой
					и<mark style={{ color: '#F42C4F', background: 'none' }}> цифрой</mark>
				</p>
			);
		}

		return (
			<p className={styles.tooltip} ref={refTipPassword} style={{ color: '#F42C4F' }}>
				Пароль не менее 8 символов, с заглавной буквой и цифрой
			</p>
		);
	};

	const handleClick = () => {
		if (isLoginValid && isPasswordValid && !disabled && watch('login') && watch('password')) {
			changeStep();
		} else {
			if (!watch('password')) onBlurPassword('');
			if (!watch('login')) onBlurLogin('');
			setDisabled(true);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h2 className={styles.form__title}>Регистрация</h2>
			<p className={styles.form__steps}>1 шаг из 3 </p>
			<div className={styles.form__inputs}>
				<div className={styles.wrapper__input}>
					<input
						{...register('login', {
							required: true,
							onBlur: (e) => onBlurLogin(e.target.value),
						})}
						value={login}
						onFocus={() => onFocusLogin()}
						type='text'
						name='login'
						className={isLoginValid ? styles.input : `${styles.error} ${styles.input}`}
						placeholder='Придумайте логин для входа'
					/>
					{errors?.login ? validLogin(login) : validLogin(login)}
				</div>
				<div className={styles.wrapper__input}>
					<input
						{...register('password', {
							required: true,
							onBlur: (e) => onBlurPassword(e.target.value),
						})}
						onFocus={() => onFocusPassword()}
						type={toggle ? 'text' : 'password'}
						className={isPasswordValid ? styles.input : `${styles.error} ${styles.input}`}
						placeholder='Пароль'
					/>
					<span className={check ? `${styles.form__okey} ${styles['form__okey--active']}` : styles.form__okey}>
						{IconOkey}
					</span>
					<button className={styles.form__eye} type='button' onClick={() => setToogle(!toggle)}>
						{toggle ? IconEyeOpen : IconEyeClose}
					</button>
					{errors?.login ? validPassword(password) : validPassword(password)}
				</div>
			</div>
			<button
				disabled={disabled}
				className={disabled ? `${styles.form__btn} ${styles.disabled}` : styles.form__btn}
				type='submit'
				onClick={handleClick}
			>
				следующий шаг
			</button>
			<div className={styles.from__text}>
				<Link className={styles.form__account}>Есть учётная запись?</Link>
				<Link to='/auth' className={styles.form__action}>
					войти {IconArrow}
				</Link>
			</div>
		</form>
	);
};
