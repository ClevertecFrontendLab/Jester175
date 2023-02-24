import { bgDefault } from '../../../assets/images/main/card';
import { Rating } from '../rating';

import styles from './card-tile.module.css';

export const CardTile = ({ book, query }) => {

    const selectedWord = () => {
        if (query) {
            const regex = new RegExp(`(${query}+)`, 'gi');
            const parts = book.title.split(regex);

            return parts.map((part) => (regex.test(part) ? <mark data-test-id='highlight-matches' style={{color: '#FF5253', background: 'none'}}>{part}</mark> : part));
        }

        return book.title
    }

    const text = selectedWord();

	return (
		<div className={styles.card}>
			<div className={styles.picture}>
				<img src={book?.image?.url ? `https://strapi.cleverland.by${book.image.url}` : bgDefault} alt='Обложка' />
			</div>
			<div className={styles.estimation}>
				<Rating length={Math.round(book.rating) ?? 0} />
			</div>
			<div className={styles.descr}>
				<h4 className={styles.title}>{text}</h4>
				<p className={styles.author}>
					{book.authors.map((author) => `${author}, `)} {book.issueYear}
				</p>
			</div>
			<button className={styles[book.delivery ? 'btn-order' : book.booking ? 'btn-order' : 'btn']} type='button'>
				{book.delivery ? `Занята до ${book.delivery.dateOrder}` : book.booking ? 'Забронирована' : 'Забронировать'}
			</button>
		</div>
	);
};
