import { useSelector } from 'react-redux';

import styles from './loader.module.css';

export const Loader = () => {
	const isLoading = useSelector((state) => state.loader.isLoading);

	return (
		<div className={isLoading ? styles.boxShadow : styles['boxShadow--hidden']} data-test-id='loader'>
			<div className={styles.loader}>{}</div>
		</div>
	);
};
