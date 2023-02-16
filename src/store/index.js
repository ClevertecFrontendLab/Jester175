import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { booksReducer } from './books-reducer';
import { categoriesReducer } from './categories-reducer';
import { commentsReducer } from './comments-reducer';
import { currentBookReducer } from './current-book-reducer';
import { loaderReducer } from './loader-reducer';
import { modalReducer } from './modal-reducer';
import { toggleReducer } from './toggle-reducer';

const rootReducer = combineReducers({
    toggle: toggleReducer,
	comments: commentsReducer,
	books: booksReducer,
	categories: categoriesReducer,
	currentBook: currentBookReducer,
	loader: loaderReducer,
	modal: modalReducer,
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
