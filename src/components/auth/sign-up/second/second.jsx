import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { IconArrow } from 'assets/images/auth';

import styles from '../sign-up.module.css';

export const SignUpSecondStep = ({ changeStep }) => {
	const [disabled, setDisabled] = useState(false);

	const {
		register,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

    const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	const handleClick = () => {
		if (!disabled && firstname && lastname) {
            changeStep();
		} else {
			setDisabled(true);
		}
	};

    useMemo(() => {
        if(firstname && lastname) {
            setDisabled(false);
        }
    }, [firstname, lastname])

	return (
		<form className={styles.form}>
			<h2 className={styles.form__title}>Регистрация</h2>
			<p className={styles.form__steps}>2 шаг из 3 </p>
			<div className={styles.form__inputs}>
				<div className={styles.wrapper__input}>
					<input
						{...register('firstname', {
							required: true,
                            onBlur: e => setFirstname(e.target.value)
						})}
						type='text'
						className={styles.input}
						placeholder='Имя'
					/>
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
                            onBlur: e => setLastname(e.target.value)
						})}
						type='text'
						className={styles.input}
						placeholder='Фамилия'
					/>
					{errors?.lastname && (
						<p className={styles.tooltip} style={{ color: '#F42C4F' }}>
							Поле не может быть пустым
						</p>
					)}
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
