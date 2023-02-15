import { Strapi } from 'api/strapi';
import { addBooks } from 'store/books-reducer';
import { addCategories } from 'store/categories-reducer';
import { addBook } from 'store/current-book-reducer';
import { setLoading } from 'store/loader-reducer';
import { showModalError } from 'store/modal-error-reducer';

const strapi = new Strapi();

export const fetchBooks = () => async (dispatch) => {
	try {
        const response = await strapi.getBooks();

        dispatch(addBooks(response));
	} catch (e) {
		dispatch(showModalError(true));
	} finally {
        dispatch(setLoading(false));
    }
};

export const fetchCategories = () => async (dispatch) => {
    dispatch(setLoading(true));
	try {
		const response = await strapi.getCategories();

        dispatch(addCategories(response));
	} catch (e) {
		dispatch(showModalError(true));
	}
};

export const fetchBook = (id) => async (dispatch) => {
    dispatch(setLoading(true));
	try {
        const response = await strapi.getBook(id);

        dispatch(addBook(response));
	} catch (e) {
		dispatch(showModalError(true));
	} finally {
        dispatch(setLoading(false));
    }
};
