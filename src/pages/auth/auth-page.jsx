import { Outlet } from 'react-router-dom';
import { Loader } from 'components/loader';

import styles from './auth.module.css';

export const AuthPage = () => (
	<div className={styles.page}>
		<Loader />
		<h1 className={styles.title}>Cleverland</h1>
		<div className={styles.form}>
			<Outlet />
		</div>
	</div>
);
