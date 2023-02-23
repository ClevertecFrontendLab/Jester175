import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { IconArrow } from 'assets/images/sidebar';
import { toggleAccordion, toggleBurgerMenu } from 'store/toggle-reducer';

import styles from './sidebar.module.css';

export const Sidebar = () => {
	const dispatch = useDispatch();
	const isBurger = useSelector((state) => state.toggle.isBurger);
	const isAccordion = useSelector((state) => state.toggle.isAccordion);
	const categories = useSelector((state) => state.data.categories);
	const books = useSelector((state) => state.data.books);
	const isCategoriesError = useSelector((state) => state.status.categoriesError);
	const sidebarCategories = [];

	categories.forEach((item) => {
		sidebarCategories.push(item.path);
	});
	sidebarCategories[0] = 'books';

	const setActive = ({ isActive }) => (isActive ? styles['item--active'] : styles.item);

	const clickSidebar = () => {
		dispatch(toggleBurgerMenu(false));
	};

	const clickAccordion = (value) => {
		dispatch(toggleAccordion(value));
	};

	const countEachCategory = () => {
		const arrCountEachCategory = [];

		categories.forEach((itemC) => {
			arrCountEachCategory.push(books.filter((book) => book.categories.find((item) => item === itemC.name)).length);
		});

		arrCountEachCategory[0] = null;

		return arrCountEachCategory;
	};

	const menuRef = useRef();
	const { category } = useParams();
	const { bookId } = useParams();

	useEffect(() => {
		const handler = (e) => {
			if (!menuRef.current.contains(e.target) && !e.target.closest('#burger') && isBurger) {
				clickSidebar();
			}
		};

		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	return (
		<aside
			className={isBurger ? `${styles['section--active']} ${styles.section}` : styles.section}
			ref={menuRef}
			data-test-id='burger-navigation'
		>
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink
						data-test-id='navigation-showcase'
						className={setActive}
						to={`/books/${category || 'all'}${bookId ? `/${bookId}` : ''}`}
						onClick={() => clickAccordion(!isAccordion)}
					>
						<span className={styles.item__arrow} data-test-id='burger-showcase'>
							Витрина книг
						</span>
						<span className={isAccordion ? styles.arrow : `${styles['arrow--active']} ${styles.arrow}`}>
							{IconArrow}
						</span>
					</NavLink>
					<ul className={isAccordion ? styles.sublist : styles['sublist--hidden']}>
						{isCategoriesError
							? ''
							: categories.map(({ name, path }, index) => (
									<li
										className={category === path ? `${styles.subitem} ${styles['subitem--active']}` : styles.subitem}
										key={name}
									>
										<Link
											to={`/books/${path}`}
											data-path='data'
                                            className={styles['subitem--link']}
											data-test-id={`navigation-${sidebarCategories[index]}`}
											onClick={clickSidebar}
										>
											{name}
										</Link>
										<Link
											className={styles['subitem__burger--link']}
											to={`/books/${path}`}
											data-path='data'
											data-test-id={`burger-${sidebarCategories[index]}`}
											onClick={clickSidebar}
										>
											{name}
										</Link>
										<span
											className={styles.count}
											data-test-id={`navigation-book-count-for-${sidebarCategories[index]}`}
										>
											{countEachCategory()[index]}
										</span>
										<span
											className={styles['count--burger']}
											data-test-id={`burger-book-count-for-${sidebarCategories[index]}`}
										>
											{countEachCategory()[index]}
										</span>
									</li>
							  ))}
					</ul>
				</li>
				<li className={styles.item} data-test-id='navigation-terms'>
					<NavLink data-test-id='burger-terms' className={setActive} to='/terms' onClick={() => clickAccordion(false)}>
						Правила пользования
					</NavLink>
				</li>
				<li className={styles.item} data-test-id='navigation-contract'>
					<NavLink
						data-test-id='burger-contract'
						className={setActive}
						to='/contract'
						onClick={() => clickAccordion(false)}
					>
						Договор оферты
					</NavLink>
				</li>
			</ul>
			<ul className={styles.list__additional}>
				<li className={styles.item}>
					<NavLink className={setActive} to='/profile' onClick={() => clickAccordion(false)}>
						Профиль
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink className={setActive} to='/exit' onClick={() => clickAccordion(false)}>
						Выход
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};
