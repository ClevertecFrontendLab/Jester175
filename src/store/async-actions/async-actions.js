import { Strapi } from 'api/strapi';
import { addBooks } from 'store/books-reducer';
import { addCategories } from 'store/categories-reducer';
import { addBook } from 'store/current-book-reducer';
import { setLoading } from 'store/loader-reducer';
import { showModalError } from 'store/modal-error-reducer';

const strapi = new Strapi();

export const fetchCategories = () => async (dispatch) => {
	try {
		const response = await strapi.getCategories();

        if(response.error){
            throw new Error()
        }else {
            dispatch(addCategories(response));
            dispatch(setLoading(false));
        }
	} catch (e) {
		dispatch(showModalError(true));
        dispatch(setLoading(false));
	}
};

export const fetchBooks = () => async (dispatch) => {
	try {
        const response = await strapi.getBooks();

        if(response.error){
            throw new Error()
        }else {
            dispatch(addBooks(response));
            dispatch(setLoading(false));
        }
	} catch (e) {
        dispatch(setLoading(false));
		dispatch(showModalError(true));
	}
};

export const fetchBook = (id) => async (dispatch) => {
	try {
        const response = await strapi.getBook(id);

        if(response.error){
            throw new Error()
        }else {
            dispatch(addBook(response));
            dispatch(setLoading(false));
        }
	} catch (e) {
        dispatch(setLoading(false));
		dispatch(showModalError(true));
	}
};
