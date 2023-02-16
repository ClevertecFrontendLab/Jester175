import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const BreadCrumbs = ({ book }) => {
    const { category } = useParams();
    const categories = useSelector((state) => state.categories.categories);

    const extractedCategory = categories?.find((item) => item.path === category)?.name;

	return (
		<div className={styles.breadcrumbs}>
			<span>{extractedCategory ?? 'Все книги'}</span>
			<span className={styles.divider}>/</span>
			<span className={styles.breadcrumbs__title}>{book?.title}</span>
		</div>
	);
};
