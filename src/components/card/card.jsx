import { CardList } from './card-list';
import { CardTile } from './card-tile';


export const Card = ({ book, groupBy }) => {
	switch (groupBy) {
		case 'groupByList':
			return <CardList book={book} />;
		default:
			return <CardTile book={book} />;
	}
};
