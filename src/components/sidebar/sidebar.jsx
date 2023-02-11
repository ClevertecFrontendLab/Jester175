import { CATEGORIES as categories } from 'constants';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { IconArrow } from 'assets/images/sidebar';
import { toggleAccordion } from 'store/accordion-reducer';
import { toggleBurgerMenu } from 'store/burger-reducer';

import styles from './sidebar.module.css';

export const Sidebar = () => {
	const dispatch = useDispatch();
	const isBurger = useSelector((state) => state.burger.isBurger);
	const isAccordion = useSelector((state) => state.accordion.isAccordion);

	const setActive = ({ isActive }) => (isActive ? styles['item--active'] : styles.item);

	const clickSidebar = () => {
		dispatch(toggleBurgerMenu(false));
	};

	const clickAccordion = (value) => {
		dispatch(toggleAccordion(value));
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
						<span className={isAccordion ? styles.arrow : `${styles['arrow--active']} ${styles.arrow}`}>{IconArrow}</span>
					</NavLink>
					<ul className={isAccordion ? styles.sublist : styles['sublist--hidden']}>
						{categories.map(({ name, path }) => (
							<li
								className={category === path ? `${styles.subitem} ${styles['subitem--active']}` : styles.subitem}
								data-test-id='navigation-books'
								key={name}
							>
								<Link to={`/books/${path}`} data-path='data' data-test-id='burger-books' onClick={clickSidebar}>
									{name}
									<span className={styles.count}>{Math.round(Math.random() * 54)}</span>
								</Link>
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
