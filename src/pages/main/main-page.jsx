import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconList, IconLoupe, IconTile } from 'assets/images/main/sort';
import { IconClose } from 'assets/images/main/sort/icons';
import { Card } from 'components/card';
import { books } from 'data/books';

import styles from './main-page.module.css';

export const MainPage = () => {
	const [display, setDisplay] = useState('groupByTile');
	const [search, setSearch] = useState(false);
	const [clickSearch, setClickSearch] = useState(false);


	const ref = useRef();
	const { category } = useParams();
	const filterData = (arr, category) => {
		if (category === 'all') return arr;

		return arr.filter((item) => item.category === category);
	};

	const visibleItems = filterData(books, category);

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
									clickSearch ? `${styles['searchIcon--hidden']} ${styles.searchIcon}` : `${styles.searchIcon}`
								}`}
								onClick={() => {
									setClickSearch(true);
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
									search
										? `${styles['search--active']} ${styles.input} ${styles.search}`
										: `${styles.input} ${styles.search}`
								} ${clickSearch ? `${styles['search--active']}` : ''}`}
								onClick={() => setSearch(true)}
							/>
							<button
								className={styles.close}
								type='button'
								data-test-id='button-search-close'
								onClick={() => {
									setSearch(false);
									clearField();
                                    setClickSearch(false)
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
						className={`${styles.btn} ${display === 'groupByTile' ? styles.displayActive : styles.tile}`}
						onClick={() => setDisplay('groupByTile')}
					>
						{IconTile}
					</button>
					<button
						type='button'
						data-test-id='button-menu-view-list'
						onClick={() => setDisplay('groupByList')}
						className={`${styles.btn} ${display === 'groupByList' ? styles.displayActive : styles.list}`}
					>
						{IconList}
					</button>
				</div>
			</div>
			<div className={styles[display]}>
				{visibleItems.map((book) => (
					<Link to={`/books/${book.category}/${book.id}`} key={book.id} data-test-id='card' className={styles.linkCard}>
						<Card key={book.id} book={book} groupBy={display} />
					</Link>
				))}
			</div>
		</section>
	);
};
