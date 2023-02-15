import { useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const BreadCrumbs = ({ book }) => {
    const { category } = useParams();

	// const extractBookCategory = categories.find(item => item.path === category)?.name;

	return (
		<div className={styles.breadcrumbs}>
			<span>{category}</span>
			<span className={styles.divider}>/</span>
			<span className={styles.breadcrumbs__title}>{book?.title}</span>
		</div>
	);
};
