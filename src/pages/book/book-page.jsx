import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconArrow } from 'assets/images/book';
import { bgDefault } from 'assets/images/main/card';
import { user } from 'assets/images/user';
import { BreadCrumbs } from 'components/breadcrumbs';
import { Rating } from 'components/card/rating';
import { CollageSwiper } from 'components/collage-swiper';
import { Comment } from 'components/comment/';
import { Sidebar } from 'components/sidebar';
import { books } from 'data/books';
import { fetchBooks } from 'store/async-actions/books';
import { clickComments } from 'store/comments-reducer';

import styles from './book-page.module.css';

export const BookPage = () => {
	const dispatch = useDispatch();
	const isComments = useSelector((state) => state.comments.isComments);
	// const booksAsync = useSelector((state) => state.books.books);

	const btnClickComments = (value) => {
		dispatch(clickComments(value));
	};

	const { bookId } = useParams();

	const book = books.find((item) => item.id === bookId);

	const [currentImage, setCurrentImage] = useState(book.image);

	const setImage = (value) => {
		setCurrentImage(value);
	};

	return (
		<section className={styles.section}>
			<div className={styles.sidebar}>
				<Sidebar />
			</div>
			<div className={styles.wrapperBreadCrumbs}>
				<div className={styles.container}>
					<BreadCrumbs book={book} />
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.preview}>
					<div className={styles.preview__picture}>
						<img
							src={currentImage ?? bgDefault}
							className={book.otherImage ? `${styles['preview__img--hidden']}` : null}
							alt='Обложка'
						/>
						<CollageSwiper book={book} setImage={setImage} />
					</div>
					<div className={styles.preview__view}>
						<h2 className={styles.preview__title}>{book.title}</h2>
						<p className={styles.preview__author}>{book.author}</p>
						<button
							className={styles[book.bookedTill ? 'btn-order' : book.isBooked ? 'btn-order' : 'btn']}
							type='button'
						>
							{book.bookedTill ? `Занята до ${book.bookedTill}` : book.isBooked ? 'Забронирована' : 'Забронировать'}
						</button>
						<div className={`${styles.text} ${styles.text__1440}`}>
							<div className={`${styles.about} ${styles.subtitle}`}>О книге</div>
							<p className={styles.descr}>
								Алгоритмы&nbsp;&mdash; это всего лишь пошаговые алгоритмы решения задач, и&nbsp;большинство таких задач
								уже были кем-то решены, протестированы и&nbsp;проверены. Можно, конечно, погрузится в&nbsp;глубокую
								философию гениального Кнута, изучить многостраничные фолианты с&nbsp;доказательствами
								и&nbsp;обоснованиями, но&nbsp;хотите&nbsp;ли вы&nbsp;тратить на&nbsp;это свое время?
							</p>
							<p className={styles.descr}>
								Откройте великолепно иллюстрированную книгу и&nbsp;вы&nbsp;сразу поймете, что алгоритмы&nbsp;&mdash; это
								просто. А&nbsp;грокать алгоритмы&nbsp;&mdash; это веселое и&nbsp;увлекательное занятие.
							</p>
						</div>
					</div>
					<div className={`${styles.text} ${styles.text__768}`}>
						<div className={`${styles.about} ${styles.subtitle}`}>О книге</div>
						<p className={styles.descr}>
							Алгоритмы&nbsp;&mdash; это всего лишь пошаговые алгоритмы решения задач, и&nbsp;большинство таких задач
							уже были кем-то решены, протестированы и&nbsp;проверены. Можно, конечно, погрузится в&nbsp;глубокую
							философию гениального Кнута, изучить многостраничные фолианты с&nbsp;доказательствами
							и&nbsp;обоснованиями, но&nbsp;хотите&nbsp;ли вы&nbsp;тратить на&nbsp;это свое время?
						</p>
						<p className={styles.descr}>
							Откройте великолепно иллюстрированную книгу и&nbsp;вы&nbsp;сразу поймете, что алгоритмы&nbsp;&mdash; это
							просто. А&nbsp;грокать алгоритмы&nbsp;&mdash; это веселое и&nbsp;увлекательное занятие.
						</p>
					</div>
				</div>
				<div className={styles.rating}>
					<h3 className={`${styles.subtitle}`}>Рейтинг</h3>
					<div className={styles.estimation}>
						<Rating length={book.estimate ?? 0} />
						<span className={styles.estimate}>{book.estimate}</span>
					</div>
				</div>
				<div className={styles.info}>
					<h3 className={`${styles.subtitle}`}>Подробная информация</h3>
					<div className={styles.details}>
						<ul className={styles.list}>
							<li className={styles.item}>
								<span className={styles.parameter}>Издательство</span>
								<span className={styles.value}>Питер</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Год издания</span>
								<span className={styles.value}>2019</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Страниц</span>
								<span className={styles.value}>288</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Переплёт</span>
								<span className={styles.value}>Мягкая обложка</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Формат</span>
								<span className={styles.value}>70х100</span>
							</li>
						</ul>
						<ul className={styles.list}>
							<li className={styles.item}>
								<span className={styles.parameter}>Жанр</span>
								<span className={styles.value}>Компьютерная литература</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Вес</span>
								<span className={styles.value}>370 г</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>ISBN</span>
								<span className={styles.value}>978-5-4461-0923-4</span>
							</li>
							<li className={styles.item}>
								<span className={styles.parameter}>Изготовитель</span>
								<span className={styles.value}>
									<p>
										<nobr>ООО &laquo;Питер Мейл&raquo;</nobr>. РФ, 198&#8239;206, г.&nbsp;<nobr>Санкт-Петербург</nobr>,
										Петергофское ш, д. 73, лит. А29
									</p>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.feedback}>
					<button
						className={`${
							book.estimate ? `${styles['feedback--visible']} ${styles.feedback__content}` : styles.feedback__content
						} ${isComments ? styles.borderHidden : 0}`}
						onClick={() => btnClickComments(!isComments)}
						type='button'
						data-test-id='button-hide-reviews'
					>
						<div className={styles.feedback__contentWrapper}>
							<div className={styles.feedback__title}>Отзывы</div>
							<div className={styles.feedback__count}>{book.estimate ?? 0}</div>
						</div>
						<span
							className={`${book.estimate ? styles.feedback__arrow : styles['feedback__arrow--hidden']}
                            ${isComments ? styles['feedback__arrow--close'] : ''}`}
						>
							{IconArrow}
						</span>
					</button>
					{!!book.estimate && (
						<div
							className={
								isComments ? `${styles.feedback__users} ${styles['feedback__users--hidden']}` : styles.feedback__users
							}
						>
							<Comment
								book={book}
								user={{
									name: 'Иван Иванов',
									date: '5 января 2019',
									avatar: user,
								}}
							/>
							<Comment
								book={book}
								user={{
									name: 'Николай Качков',
									date: '20 июня 2018',
									avatar: user,
									comment: `Учитывая ключевые сценарии поведения, курс на&nbsp;социально-ориентированный национальный проект
									не&nbsp;оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение
									современных методик предоставляет широкие возможности для позиций, занимаемых участниками
									в&nbsp;отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на&nbsp;базе
									интернет-аналитики выводы будут в&nbsp;равной степени предоставлены сами себе. Вот вам яркий пример
									современных тенденций&nbsp;&mdash; глубокий уровень погружения создаёт предпосылки для своевременного
									выполнения сверхзадачи. И&nbsp;нет сомнений, что акционеры крупнейших компаний, инициированные
									исключительно синтетически, превращены в&nbsp;посмешище, хотя само их&nbsp;существование приносит
									несомненную пользу обществу.`,
								}}
							/>
							<Comment
								book={book}
								user={{
									name: 'Екатерина Беляева',
									date: '18 февраля 2018',
									avatar: user,
								}}
							/>
						</div>
					)}
					<button type='button' className={styles.feedback__btn} data-test-id='button-rating'>
						оценить книгу
					</button>
				</div>
			</div>
		</section>
	);
};
