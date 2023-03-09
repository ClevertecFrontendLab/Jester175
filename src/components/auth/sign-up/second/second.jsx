import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';
import { setDataReg } from 'store/auth-reducer';

import styles from '../sign-up.module.css';

export const SignUpSecondStep = ({ changeStep }) => {
	const {
		register,
		formState: { errors },
		watch,
	} = useForm({ mode: 'onBlur' });

	const [disabled, setDisabled] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	const [isFirstNamePlaceholder, setIsFirstNamePlaceholder] = useState(false);
	const [isLastNamePlaceholder, setIsLastNamePlaceholder] = useState(false);

	useEffect(() => {
		const subscription = watch((value) => {
			setFirstname(value?.firstname);
			setLastname(value?.lastname);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const onBlurFirstName = (value) => {
		setFirstname(value);
		if (!firstname.length) setIsFirstNamePlaceholder(false);
	};

	const onBlurLastName = (value) => {
		setLastname(value);
		if (!lastname.length) setIsLastNamePlaceholder(false);
	};

	const onFocusFirstName = () => {
		setIsFirstNamePlaceholder(true);
	};

	const onFocusLastName = () => {
		setIsLastNamePlaceholder(true);
	};

	const dispatch = useDispatch();

	const handleClick = () => {
		if (!disabled && firstname && lastname) {
			dispatch(setDataReg({ firstName: watch('firstname'), lastName: watch('lastname') }));
			changeStep();
		} else {
			setDisabled(true);
		}
	};

	useMemo(() => {
		if (firstname && lastname) {
			setDisabled(false);
		}
	}, [firstname, lastname]);

	return (
		<form className={styles.form}>
			<h2 className={styles.form__title}>Регистрация</h2>
			<p className={styles.form__steps}>2 шаг из 3 </p>
			<div className={styles.form__inputs}>
				<div className={styles.wrapper__input}>
					<input
						{...register('firstname', {
							required: true,
							onBlur: (e) => onBlurFirstName(e.target.value),
						})}
						type='text'
						className={`${styles.input} ${isFirstNamePlaceholder ? styles['placeholder--active'] : ''}`}
						placeholder='Имя'
						onFocus={onFocusFirstName}
					/>
					<span className={isFirstNamePlaceholder ? styles.focusedPlaceholder : styles['focusedPlaceholder--hidden']}>
						Имя
					</span>
					{errors?.firstname && (
						<p className={styles.tooltip} style={{ color: '#F42C4F' }}>
							Поле не может быть пустым
						</p>
					)}
				</div>
				<div className={styles.wrapper__input}>
					<input
						{...register('lastname', {
							required: true,
							onBlur: (e) => onBlurLastName(e.target.value),
						})}
						type='text'
						className={`${styles.input} ${isLastNamePlaceholder ? styles['placeholder--active'] : ''}`}
						placeholder='Фамилия'
						onFocus={onFocusLastName}
					/>
					<span className={isLastNamePlaceholder ? styles.focusedPlaceholder : styles['focusedPlaceholder--hidden']}>
						Фамилия
					</span>
					{errors?.lastname && (
						<p className={styles.tooltip} style={{ color: '#F42C4F' }}>
							Поле не может быть пустым
						</p>
					)}
				</div>
			</div>
			<button disabled={disabled} className={styles.form__btn} type='submit' onClick={handleClick}>
				последний шаг
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
