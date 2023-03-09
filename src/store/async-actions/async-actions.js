import { Strapi } from 'api/strapi';
import { toggleAuth, toggleRegistration } from 'store/auth-reducer';
import { addBook, addBooks, addCategories } from 'store/data-reducer';
import { addBookError, addBooksError, addCategoriesError, setLoading, showModal } from 'store/status-reducer';

export const fetchBooks = () => async (dispatch) => {
	try {
		const response = await Strapi.getBooks();

		dispatch(addBooks(response.data));
	} catch (e) {
		dispatch(addBooksError(true));
		dispatch(showModal(true));
	} finally {
		dispatch(setLoading(false));
	}
};

export const fetchCategories = () => async (dispatch) => {
	try {
		const response = await Strapi.getCategories();

		dispatch(addCategories(response.data));
	} catch (e) {
		dispatch(addCategoriesError(true));
		dispatch(showModal(true));
	}
};

export const fetchBook = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await Strapi.getBook(id);

		dispatch(addBook(response.data));
	} catch (e) {
		dispatch(addBookError(true));
		dispatch(showModal(true));
	} finally {
		dispatch(setLoading(false));
	}
};

export const fetchLogin = (data) => async (dispatch) => {
	try {
		const response = await Strapi.authLogin(data);

        localStorage.setItem('jwt', response?.data.jwt);

		dispatch(toggleAuth({authorized: true}));
        dispatch(toggleAuth({status: response.status}));

	} catch (error) {
		dispatch(toggleAuth({status: error.response.status}));
	}finally {
        dispatch(setLoading(false));
    }
};
export const fetchRegistration = (data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await Strapi.authRegistration(data);

		dispatch(toggleRegistration({status: response.status}));
	} catch (error) {
		dispatch(toggleRegistration({status: error.response.status}));
	} finally {
        dispatch(setLoading(false));
	}
};
