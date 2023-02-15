const stateDefault = {
	books: [],
};

const ADD_BOOKS = 'ADD_BOOKS';

export const booksReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ADD_BOOKS:
			return { ...state, books: action.books };
		default:
			return state;
	}
};

export const addBooks = (books) => ({ type: ADD_BOOKS, books });
