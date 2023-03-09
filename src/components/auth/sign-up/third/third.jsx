import { validatePatterns as pattern } from 'constants/constants.js';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';
import { fetchRegistration } from 'store/async-actions/async-actions';
import { setData } from 'store/auth-reducer';

import styles from '../sign-up.module.css';

export const SignUpThirdStep = () => {
	const {
		register,
		reset,
		resetField,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const regData = useSelector((state) => state.auth.data);

	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');

	const [isTelNamePlaceholder, setIsTelPlaceholder] = useState(false);
	const [isEmailPlaceholder, setIsEmailNamePlaceholder] = useState(false);

	const [isTelValid, setIsTelValid] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);

	const [disabled, setDisabled] = useState(false);

	const onBlurTel = (value) => {
		if (!value.length) setIsTelPlaceholder(false);
		if (!value.includes('_') && value !== '') {
			setIsTelValid(true);
		}
	};

	const onBlurEmail = (value) => {
		if (!email.length) setIsEmailNamePlaceholder(false);
		if (value.match(pattern.email.general) && value !== '') {
			setIsEmailValid(true);
		}
	};

	const onFocusTel = () => {
		setIsTelPlaceholder(true);
	};

	const onFocusEmail = () => {
		setIsEmailNamePlaceholder(true);
	};

	useEffect(() => {
		const subscription = watch((value) => {
			setTel(value?.phone);
			setEmail(value?.email);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const validEmail = (query) => {
		if (!query || !query.length) {
			return '';
		}

		if (!query.match(pattern.email.general)) {
			return (
				<p className={styles.tooltip} style={{ color: '#F42C4F' }}>
					Введите корректный e-mail
				</p>
			);
		}

		return '';
	};
	const validTel = (query) => {
		if (!query || !query.length) {
			<p className={styles.tooltip}>В формате +375 (xx) xxx-xx-xx</p>;
		}

		if (query?.includes('_')) {
			return (
				<p className={styles.tooltip} style={{ color: '#F42C4F' }}>
					В формате +375 (xx) xxx-xx-xx
				</p>
			);
		}

		return <p className={styles.tooltip}>В формате +375 (xx) xxx-xx-xx</p>;
	};

	const onSubmit = (data) => {
		if (!disabled && isTelValid && isEmailValid) {
			dispatch(setData(Object.assign(regData, data)));
			dispatch(fetchRegistration(regData));
			navigate('/response');
			resetField('phone', {
				defaultValue: '',
			});
			reset();
		} else {
			setDisabled(true);
		}
	};

	useMemo(() => {
		if (isEmailValid && isTelValid) {
			setDisabled(false);
		}
	}, [isTelValid, isEmailValid]);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.form__title}>Регистрация</h2>
			<p className={styles.form__steps}>3 шаг из 3 </p>
			<div className={styles.form__inputs}>
				<div className={styles.wrapper__input}>
					<InputMask
						{...register('phone', {
							required: true,
							onBlur: (e) => onBlurTel(e.target.value),
						})}
						type='tel'
						mask='+375(99)999-99-99'
						className={`${styles.input} ${isTelNamePlaceholder   ? styles['placeholder--active'] : ''}`}
						placeholder='Номер телефона'
						onFocus={onFocusTel}
					/>
					<span className={isTelNamePlaceholder ? styles.focusedPlaceholder : styles['focusedPlaceholder--hidden']}>
						Номер телефона
					</span>
					{errors?.tel ? validTel(tel) : validTel(tel)}
				</div>
				<div className={styles.wrapper__input}>
					<input
						{...register('email', {
							required: true,
							onBlur: (e) => onBlurEmail(e.target.value),
						})}
						type='text'
						className={`${styles.input} ${isEmailPlaceholder ? styles['placeholder--active'] : ''}`}
						placeholder='E-mail'
						onFocus={onFocusEmail}
					/>
					<span className={isEmailPlaceholder ? styles.focusedPlaceholder : styles['focusedPlaceholder--hidden']}>
						E-mail
					</span>
					{errors?.email ? validEmail(email) : validEmail(email)}
				</div>
			</div>
			<button disabled={disabled} className={styles.form__btn} type='submit'>
				зарегистрироваться
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
