import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleBurgerMenu } from 'store/toggle-reducer';

import avatar from '../../assets/images/header/header_avatar.svg';
import logo from '../../assets/images/header/logo.svg';

import styles from './header.module.css';

export const Header = () => {

    const dispatch = useDispatch();
	const isBurger = useSelector(state => state.toggle.isBurger);

	function handlerClickBurger() {
		dispatch(toggleBurgerMenu(!isBurger));
	}

	return (
		<header className={styles.section}>
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
						<div className={styles.profile}>
							<p className={styles.descr}>Привет, Иван!</p>
							<img src={avatar} alt='Аватарка' className={styles.avatar} />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
