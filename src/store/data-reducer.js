const stateDefault = {
	books: [],
	book: null,
	categories: [],
    searchQuery: '',
};

const ADD_BOOKS = 'ADD_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const ADD_CATEGORIES = 'ADD_CATEGORIES';
const ADD_SEARCH_QUERY = 'ADD_SEARCH_QUERY';

export const dataReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ADD_BOOKS:
			return { ...state, books: action.books };
		case ADD_BOOK:
			return { ...state, book: action.book };
		case ADD_SEARCH_QUERY:
			return { ...state, searchQuery: action.query };
		case ADD_CATEGORIES:
			return { ...state, categories: [{ name: 'Все книги', path: 'all', id: 0 }, ...action.categories] };
		default:
			return state;
	}
};

export const addBooks = (books) => ({ type: ADD_BOOKS, books });
export const addBook = (book) => ({ type: ADD_BOOK, book });
export const addCategories = (categories) => ({ type: ADD_CATEGORIES, categories });
export const addSearchQuery = (query) => ({ type: ADD_SEARCH_QUERY, query });
