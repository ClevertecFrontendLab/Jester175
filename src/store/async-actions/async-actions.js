import { Strapi } from 'api/strapi';
import { addBook, addBooks, addCategories } from 'store/data-reducer';
import { addBookError, addBooksError, addCategoriesError, setLoading, showModal } from 'store/status-reducer';

const strapi = new Strapi();

export const fetchBooks = () => async (dispatch) => {
	try {
        const response = await strapi.getBooks();

        if(response.error) throw new Error();
        dispatch(addBooks(response));
	} catch (e) {
		dispatch(addBooksError(true));
		dispatch(showModal(true));
	} finally {
        dispatch(setLoading(false));
    }
};

export const fetchCategories = () => async (dispatch) => {
	try {
		const response = await strapi.getCategories();

        if(response.error) throw new Error();
        dispatch(addCategories(response));
	} catch (e) {
		dispatch(addCategoriesError(true));
        dispatch(showModal(true));
	}
};

export const fetchBook = (id) => async (dispatch) => {
    dispatch(setLoading(true));
	try {
        const response = await strapi.getBook(id);

        if(response.error) throw new Error();
        dispatch(addBook(response));
	} catch (e) {
		dispatch(addBookError(true));
        dispatch(showModal(true));
	} finally {
        dispatch(setLoading(false));
    }
};
