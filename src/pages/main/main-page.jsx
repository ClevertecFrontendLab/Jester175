import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IconList, IconLoupe, IconTile } from 'assets/images/main/sort';
import { IconClose } from 'assets/images/main/sort/icons';
import { Card } from 'components/card';
import { fetchBooks, fetchCategories } from 'store/async-actions';
import { clickCardView } from 'store/card-reducer';
import { setLoading } from 'store/loader-reducer';
import { clickSearch } from 'store/search-reducer';

import styles from './main-page.module.css';

export const MainPage = () => {
	const dispatch = useDispatch();
	const isSearch = useSelector((state) => state.search.isSearch);
	const cardView = useSelector((state) => state.card.cardView);
	const books = useSelector((state) => state.books.books);
	const categories = useSelector((state) => state.categories.categories);
	const isError = useSelector((state) => state.modalError.modalErr);

	const { category } = useParams();

	const swapCardView = (value) => {
		dispatch(clickCardView(value));
	};

	const closeSearch = (value) => {
		dispatch(clickSearch(value));
	};

	useEffect(() => {
		if (!books.length && !categories.length) {
			dispatch(fetchCategories());
			dispatch(fetchBooks());
		}
	}, [books, categories, dispatch]);

	const filterData = (arr, categoryParam) => {
		if (categoryParam === 'all') return arr;
		const currentCategory = categories.find((item) => item.path === categoryParam);

		return arr.filter((book) => book.categories.find((item) => item === currentCategory.name));
	};
	const visibleItems = filterData(books, category);

	const ref = useRef();
	const clearField = () => {
		ref.current.value = '';
	};

	return (
		<section className={styles.page}>
			<div className={styles.sort}>
				<div className={styles.inputs}>
					<div className={styles.inputs__wrapper}>
						<div className={styles.searchWrapper} data-test-id='button-search-open'>
							<button
								type='button'
								className={`${
									isSearch ? `${styles['searchIcon--hidden']} ${styles.searchIcon}` : `${styles.searchIcon}`
								}`}
								onClick={() => {
									closeSearch(true);
								}}
							>
								{IconLoupe}
							</button>
							<input
								ref={ref}
								type='text'
								data-test-id='input-search'
								placeholder='Поиск книги или автора...'
								className={`${
									isSearch
										? `${styles['search--active']} ${styles.input} ${styles.search}`
										: `${styles.input} ${styles.search}`
								} ${isSearch ? `${styles['search--active']}` : ''}`}
								onClick={() => closeSearch(true)}
							/>
							<button
								className={styles.close}
								type='button'
								data-test-id='button-search-close'
								onClick={() => {
									closeSearch(false);
									clearField();
								}}
							>
								{IconClose}
							</button>
						</div>
					</div>
					<input type='button' value='По рейтингу' className={`${styles.rating} ${styles.input}`} />
				</div>
				<div className={styles.btns}>
					<button
						type='button'
						data-test-id='button-menu-view-window'
						className={`${styles.btn} ${cardView === 'groupByTile' ? styles.displayActive : styles.tile}`}
						onClick={() => swapCardView('groupByTile')}
					>
						{IconTile}
					</button>
					<button
						type='button'
						data-test-id='button-menu-view-list'
						onClick={() => swapCardView('groupByList')}
						className={`${styles.btn} ${cardView === 'groupByList' ? styles.displayActive : styles.list}`}
					>
						{IconList}
					</button>
				</div>
			</div>
			<div className={styles[cardView]}>
				{visibleItems.error
					? ''
					: visibleItems.map((book) => (
							<Link
								to={`/books/${book.categories}/${book.id}`}
								key={book.id}
								data-test-id='card'
								className={styles.linkCard}
							>
								<Card key={book.id} book={book} groupBy={cardView} />
							</Link>
					  ))}
			</div>
		</section>
	);
};
