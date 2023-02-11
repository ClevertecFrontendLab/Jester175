import { CATEGORIES as categories } from 'constants';

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useOutletContext, useParams } from 'react-router-dom';
import { IconArrow } from 'assets/images/sidebar';

import styles from './sidebar.module.css';

export const Sidebar = () => {
	const setActive = ({ isActive }) => (isActive ? styles['item--active'] : styles.item);
	const [accordion, setAccordion] = useState(true);
	const [isBurger, clickSidebar] = useOutletContext();

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
						onClick={() => setAccordion(!accordion)}
					>
						<span className={styles.item__arrow} data-test-id='burger-showcase'>
							Витрина книг
						</span>
						<span className={accordion ? styles.arrow : `${styles['arrow--active']} ${styles.arrow}`}>{IconArrow}</span>
					</NavLink>
					<ul className={accordion ? styles.sublist : styles['sublist--hidden']}>
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
					<NavLink data-test-id='burger-terms' className={setActive} to='/terms' onClick={() => setAccordion(false)}>
						Правила пользования
					</NavLink>
				</li>
				<li className={styles.item} data-test-id='navigation-contract'>
					<NavLink
						data-test-id='burger-contract'
						className={setActive}
						to='/contract'
						onClick={() => setAccordion(false)}
					>
						Договор оферты
					</NavLink>
				</li>
			</ul>
			<ul className={styles.list__additional}>
				<li className={styles.item}>
					<NavLink className={setActive} to='/profile' onClick={() => setAccordion(false)}>
						Профиль
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink className={setActive} to='/exit' onClick={() => setAccordion(false)}>
						Выход
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};
