import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IconList, IconLoupe, IconTile } from 'assets/images/main/sort';
import { IconClose, IconSort } from 'assets/images/main/sort/icons';
import { Card } from 'components/card';
import { fetchBooks, fetchCategories } from 'store/async-actions';
import { addSearchQuery } from 'store/data-reducer';
import { setLoading } from 'store/status-reducer';
import { clickCardView, clickSearch, сlickRatingSort } from 'store/toggle-reducer';

import styles from './main-page.module.css';

export const MainPage = () => {
	const dispatch = useDispatch();
	const isSearch = useSelector((state) => state.toggle.isSearch);
	const cardView = useSelector((state) => state.toggle.cardView);
	const isRatingSort = useSelector((state) => state.toggle.isRatingSort);
	const books = useSelector((state) => state.data.books);
	const searchQuery = useSelector((state) => state.data.searchQuery);
	const categories = useSelector((state) => state.data.categories);
	const isBooksError = useSelector((state) => state.status.booksError);
	const [isEmpty, setIsEmpty] = useState(true);

	const { category } = useParams();
	const ref = useRef();

	const swapCardView = (value) => {
		dispatch(clickCardView(value));
	};

	const closeSearch = (value) => {
		dispatch(clickSearch(value));
	};

	useEffect(() => {
		let ignore = false;

		dispatch(setLoading(true));

		if (!categories.length) dispatch(fetchCategories());
		if (!ignore) dispatch(fetchBooks());

		return () => {
			ignore = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const filterData = useMemo(() => {
		if (category === 'all') return books;
		const currentCategory = categories?.find((item) => item.path === category);

        setIsEmpty(true);

		return books?.filter((book) => book.categories.find((item) => item === currentCategory?.name));
	}, [books, category, categories]);

	const searchedData = useMemo(() => {
        const currentData = filterData.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!currentData.length && searchQuery !== '') setIsEmpty(false);
		else setIsEmpty(true);

        return currentData;

	}, [filterData, searchQuery]);

	const sortRatingData = useMemo(() => {
		if (!isRatingSort) return searchedData.sort((a, b) => b.rating - a.rating);

		return searchedData.sort((a, b) => a.rating - b.rating);
	}, [searchedData, isRatingSort]);

	return isBooksError ? (
		''
	) : (
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
								placeholder='Поиск книги или автора…'
								value={searchQuery}
								className={`${
									isSearch
										? `${styles['search--active']} ${styles.input} ${styles.search}`
										: `${styles.input} ${styles.search}`
								} ${isSearch ? `${styles['search--active']}` : ''}`}
								onChange={(e) => {
									dispatch(addSearchQuery(e.target.value));
								}}
								onClick={() => closeSearch(true)}
							/>
							<button
								className={styles.close}
								type='button'
								data-test-id='button-search-close'
								onClick={() => {
									closeSearch(false);
								}}
							>
								{IconClose}
							</button>
						</div>
					</div>
					<div className={`${styles.sortWrapper} ${isRatingSort ? styles['sortWrapper--active'] : ''}`}>
						<button
							type='button'
							data-test-id='sort-rating-button'
							onClick={() => dispatch(сlickRatingSort(!isRatingSort))}
							className={`${styles.rating} ${styles.input}`}
						>
							По рейтингу
							{IconSort}
						</button>
					</div>
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
			<div className={sortRatingData.length ? styles[cardView] : styles.emptyBooksPosition}>
				{sortRatingData.length ? (
					sortRatingData.map((book) => (
						<Link
							to={`/books/${category}/${book.id}`}
							key={book.id}
							data-test-id='card'
							className={styles.linkCard}
							onClick={() => dispatch(сlickRatingSort(false))}
						>
							<Card key={book.id} book={book} groupBy={cardView} query={searchQuery} />
						</Link>
					))
				) : isEmpty ? (
					<h2 data-test-id='empty-category' className={styles.emptyBooks}>
						В этой категории книг ещё нет
					</h2>
				) : (
					<h2 data-test-id='search-result-not-found' className={styles.emptyBooks}>
						По запросу ничего не найдено
					</h2>
				)}
			</div>
		</section>
	);
};
