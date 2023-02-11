import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './layout.module.css';

export const Layout = () => {
	const isBurger = useSelector(state => state.burger.isBurger);

	if (isBurger) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'visible';
	}

	return (
		<div className={styles.page}>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
