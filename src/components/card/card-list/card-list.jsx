import { bgDefault } from '../../../assets/images/main/card';
import { Rating } from '../rating';

import styles from './card-list.module.css';

export const CardList = ({ book }) => (
	<div className={styles.card}>
		<div className={styles.picture}>
			<img src={book?.image?.url ? `https://strapi.cleverland.by${book.image.url}` : bgDefault} alt='Обложка' />
		</div>
		<div className={styles.content}>
			<h4 className={styles.title}>{book.title}</h4>
			<p className={styles.author}>
				{book.authors.map((author) => `${author}, `)} {book.issueYear}
			</p>
			<div className={styles.bottom}>
				<div className={styles.estimation}>
					<Rating length={Math.round(book.rating) ?? 0} />
				</div>
				<button className={styles[book.delivery ? 'btn-order' : book.booking ? 'btn-order' : 'btn']} type='button'>
					{book.delivery ? `Занята до ${book.delivery.dateOrder}` : book.booking ? 'Забронирована' : 'Забронировать'}
				</button>
			</div>
		</div>
	</div>
);
