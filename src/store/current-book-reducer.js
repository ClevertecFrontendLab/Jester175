const stateDefault = {
	book: null,
};

const ADD_BOOK = 'ADD_BOOK';

export const currentBookReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ADD_BOOK:
			return { ...state, book: action.book };
		default:
			return state;
	}
};

export const addBook = (book) => ({ type: ADD_BOOK, book });
