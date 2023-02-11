import { bgDefault } from '../../../assets/images/main/card';
import { Rating } from '../rating';

import styles from './card-tile.module.css';

export const CardTile = ({book}) => (
    <div className={styles.card}>
		<div className={styles.picture}>
			<img src={book.image ?? bgDefault} alt='Обложка' className={styles.img} />
		</div>
		<div className={styles.estimation}>
			<Rating length={book.estimate ?? 0} />
		</div>
		<div className={styles.descr}>
			<h4 className={styles.title}>{book.title}</h4>
			<p className={styles.author}>{book.author}</p>
		</div>
		<button className={styles[book.bookedTill ? 'btn-order' : book.isBooked ? 'btn-order' : 'btn']} type='button'>
			{book.bookedTill ? `Занята до ${book.bookedTill}` : book.isBooked ? 'Забронирована' : 'Забронировать'}
		</button>
	</div>
);
