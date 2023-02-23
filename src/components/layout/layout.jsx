import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Loader } from 'components/loader';
import { Modal } from 'components/modal';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './layout.module.css';

export const Layout = () => {
	const isBurger = useSelector(state => state.toggle.isBurger);

	if (isBurger) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'visible';
	}

	return (
		<div className={styles.page}>
            <Modal />
            <Loader/>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
