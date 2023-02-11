import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './layout.module.css';

export const Layout = () => {
	const [isBurger, setIsBurger] = useState(false);

	const closeBurger = () => {
		setIsBurger(!isBurger);
	};

	const closeSidebar = () => {
		setIsBurger(false);
	};

	if (isBurger) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'visible';
	}

	return (
		<div className={styles.page}>
			<Header handlerBurger={[isBurger, closeBurger]} />
			<Outlet context={[isBurger, closeSidebar]} />
			<Footer />
		</div>
	);
};
