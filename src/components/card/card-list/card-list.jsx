import { Rating } from '../rating';

import styles from './card-list.module.css';
import { bgDefault } from '../../../assets/images/main/card';

export const CardList = ({ book }) => (
	<div className={styles.card}>
		<div className={styles.picture}>
			<img src={book.image ?? bgDefault} alt='Обложка' />
		</div>
		<div className={styles.content}>
			<h4 className={styles.title}>{book.title}</h4>
			<p className={styles.author}>{book.author}</p>
			<div className={styles.bottom}>
				<div className={styles.estimation}>
					<Rating length={book.estimate ?? 0} />
				</div>
				<button className={styles[book.bookedTill ? 'btn-order' : book.isBooked ? 'btn-order' : 'btn']} type='button'>
					{book.bookedTill ? `Занята до ${book.bookedTill}` : book.isBooked ? 'Забронирована' : 'Забронировать'}
				</button>
			</div>
		</div>
	</div>
);
