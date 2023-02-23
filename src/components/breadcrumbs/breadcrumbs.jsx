import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './breadcrumbs.module.css';

export const BreadCrumbs = ({ book }) => {
    const { category } = useParams();
    const categories = useSelector((state) => state.data.categories);

    const extractedCategory = categories?.find((item) => item.path === category);

	return (
		<div className={styles.breadcrumbs}>
			<Link to={`/books/${extractedCategory?.path}`} data-test-id='breadcrumbs-link'>{extractedCategory?.name ?? 'Все книги'}</Link>
			<span className={styles.divider}>/</span>
			<span className={styles.breadcrumbs__title} data-test-id='book-name'>{book?.title}</span>
		</div>
	);
};
