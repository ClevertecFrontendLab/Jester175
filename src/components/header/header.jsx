/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Strapi } from 'api/strapi';
import avatar from 'assets/images/header/avatar.jpg';
import { toggleAuth } from 'store/auth-reducer';
import { toggleBurgerMenu } from 'store/toggle-reducer';

import logo from '../../assets/images/header/logo.svg';

import styles from './header.module.css';

export const Header = () => {
	const dispatch = useDispatch();
    const [isControls, setIsControls] = useState(false);
    const navigate = useNavigate();
	const isBurger = useSelector((state) => state.toggle.isBurger);

    const handleLogOut = () => {
        Strapi.authLoginOut();
        navigate('/auth');
        dispatch(toggleAuth({authorized: false}));
      };

	function handlerClickBurger() {
		dispatch(toggleBurgerMenu(!isBurger));
	}

	return (
		<header className={`${styles.section} ${isControls && styles.sectionActive}`}>
			<div className={styles.container}>
				<div className={styles.header}>
					<Link to='/' className={styles.logo}>
						<img src={logo} alt='Логотип' />
					</Link>
					<button
						id='burger'
						data-test-id='button-burger'
						type='button'
						className={isBurger ? styles['burger--active'] : styles.burger}
						onClick={() => handlerClickBurger()}
					>
						<span className={styles.burger__line}>&nbsp;</span>
						<span className={styles.burger__line}>&nbsp;</span>
						<span className={styles.burger__line}>&nbsp;</span>
					</button>
					<div className={styles.wrapper}>
						<h1 className={styles.title}>Библиотека</h1>
						<div className={styles.profile} onClick ={() => setIsControls(!isControls)} role='button'>
							<p className={styles.descr}>Привет, Иван!</p>
							<img src={avatar} alt='Аватарка' className={styles.avatar} />
							{isControls && (
								<div className={styles.controls}>
									<button type='button' className={styles.controlsBtn}>
										Профиль
									</button>
									<button type='button' className={styles.controlsBtn} onClick={handleLogOut}>
										Выход
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
