import { CardList } from './card-list';
import { CardTile } from './card-tile';

export const Card = ({ book, groupBy, query }) => {
	switch (groupBy) {
		case 'groupByList':
			return <CardList book={book} key={groupBy} query={query} />;
		default:
			return <CardTile book={book} key={groupBy} query={query} />;
	}
};
