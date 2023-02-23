const stateDefault = {
	booksError: false,
	bookError: false,
	categoriesError: false,
	isModal: false,
	isLoading: false,
};

const BOOKS_ERROR = 'BOOKS_ERROR';
const SHOW_MODAL = 'SHOW_MODAL';
const BOOK_ERROR = 'BOOK_ERROR';
const CATEGORIES_ERROR = 'CATEGORIES_ERROR';
const LOADING = 'LOADING';

export const statusReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case BOOKS_ERROR:
			return { ...state, booksError: action.value };
		case BOOK_ERROR:
			return { ...state, bookError: action.value };
		case SHOW_MODAL:
			return { ...state, isModal: action.value };
		case CATEGORIES_ERROR:
			return { ...state, categoriesError: action.value };
		case LOADING:
			return { ...state, isLoading: action.value };
		default:
			return state;
	}
};

export const addBooksError = (value) => ({ type: BOOKS_ERROR, value });
export const addBookError = (value) => ({ type: BOOK_ERROR, value });
export const showModal = (value) => ({ type: SHOW_MODAL, value });
export const addCategoriesError = (value) => ({ type: CATEGORIES_ERROR, value });
export const setLoading = (value) => ({ type: LOADING, value });
