import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconArrow } from 'assets/images/book';
import { BreadCrumbs } from 'components/breadcrumbs';
import { Rating } from 'components/card/rating';
import { CollageSwiper } from 'components/collage-swiper';
import { Comment } from 'components/comment/';
import { Sidebar } from 'components/sidebar';
import { fetchBook} from 'store/async-actions';
import { clickComments } from 'store/comments-reducer';

import styles from './book-page.module.css';

export const BookPage = () => {
	const dispatch = useDispatch();
	const isComments = useSelector((state) => state.comments.isComments);
	const book = useSelector((state) => state.data.book);
    const isBookError = useSelector((state) => state.status.bookError);
	const { bookId } = useParams();
	const { category } = useParams();
    const baseUrl = 'https://strapi.cleverland.by';

	const btnClickComments = (value) => {
		dispatch(clickComments(value));
	};

	useEffect(() => {
		dispatch(fetchBook(bookId));
	}, [bookId, dispatch]);

	const [currentImage, setCurrentImage] = useState(null);

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
			{isBookError ? (
				''
			) : (
				<div className={book ? styles.container : styles.hidden}>
					<div className={styles.preview}>
						<div className={styles.preview__picture}>
							<img
								src={currentImage ?? `${baseUrl}${book?.images?.[0]?.url}`}
								className={book?.images?.length >= 2 ? `${styles['preview__img--hidden']}` : null}
								alt='Обложка'
							/>
							<CollageSwiper book={book} setImage={setImage} />
						</div>
						<div className={styles.preview__view}>
							<h2 className={styles.preview__title} data-test-id='book-title'>{book?.title}</h2>
							<p className={styles.preview__author}>
								{book?.authors?.map((author) => `${author}, `)} {book?.issueYear}
							</p>
							<button
								className={styles[book?.delivery ? 'btn-order' : book?.booking ? 'btn-order' : 'btn']}
								type='button'
							>
								{book?.delivery
									? `Занята до ${book?.delivery.dateOrder}`
									: book?.booking
									? 'Забронирована'
									: 'Забронировать'}
							</button>
							<div className={`${styles.text} ${styles.text__1440}`}>
								<div className={`${styles.about} ${styles.subtitle}`}>О книге</div>
								<p className={styles.descr}>{book?.description}</p>
							</div>
						</div>
						<div className={`${styles.text} ${styles.text__768}`}>
							<div className={`${styles.about} ${styles.subtitle}`}>О книге</div>
							<p className={styles.descr}>{book?.description}</p>
						</div>
					</div>
					<div className={styles.rating}>
						<h3 className={`${styles.subtitle}`}>Рейтинг</h3>
						<div className={styles.estimation}>
							<Rating length={Math.round(book?.rating) ?? 0} />
							<span className={styles.estimate}>{book?.rating}</span>
						</div>
					</div>
					<div className={styles.info}>
						<h3 className={`${styles.subtitle}`}>Подробная информация</h3>
						<div className={styles.details}>
							<ul className={styles.list}>
								<li className={styles.item}>
									<span className={styles.parameter}>Издательство</span>
									<span className={styles.value}>{book?.publish}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Год издания</span>
									<span className={styles.value}>{book?.issueYear}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Страниц</span>
									<span className={styles.value}>{book?.pages}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Переплёт</span>
									<span className={styles.value}>{book?.cover}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Формат</span>
									<span className={styles.value}>{book?.format}</span>
								</li>
							</ul>
							<ul className={styles.list}>
								<li className={styles.item}>
									<span className={styles.parameter}>Жанр</span>
									<span className={styles.value}>{category}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Вес</span>
									<span className={styles.value}>{book?.weight} г</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>ISBN</span>
									<span className={styles.value}>{book?.ISBN}</span>
								</li>
								<li className={styles.item}>
									<span className={styles.parameter}>Изготовитель</span>
									<span className={styles.value}>
										<p>{book?.producer}</p>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.feedback}>
						<button
							className={`${
								book?.rating ? `${styles['feedback--visible']} ${styles.feedback__content}` : styles.feedback__content
							} ${isComments ? styles.borderHidden : 0}`}
							onClick={() => btnClickComments(!isComments)}
							type='button'
							data-test-id='button-hide-reviews'
						>
							<div className={styles.feedback__contentWrapper}>
								<div className={styles.feedback__title}>Отзывы</div>
								<div className={styles.feedback__count}>{book?.comments?.length ?? 0}</div>
							</div>
							<span
								className={`${book?.rating ? styles.feedback__arrow : styles['feedback__arrow--hidden']}
                            ${isComments ? styles['feedback__arrow--close'] : ''}`}
							>
								{IconArrow}
							</span>
						</button>
						{!!book?.rating && (
							<div
								className={
									isComments ? `${styles.feedback__users} ${styles['feedback__users--hidden']}` : styles.feedback__users
								}
							>
								{book?.comments?.map((comment) => (
									<Comment comment={comment} />
								))}
							</div>
						)}
						<button type='button' className={styles.feedback__btn} data-test-id='button-rating'>
							оценить книгу
						</button>
					</div>
				</div>
			)}
		</section>
	);
};
