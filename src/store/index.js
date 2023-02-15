import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { accordionReducer } from './accordion-reducer';
import { booksReducer } from './books-reducer';
import { burgerReducer } from './burger-reducer';
import { cardReducer } from './card-reducer';
import { categoriesReducer } from './categories-reducer';
import { commentsReducer } from './comments-reducer';
import { currentBookReducer } from './current-book-reducer';
import { loaderReducer } from './loader-reducer';
import { modalErrorReducer } from './modal-error-reducer';
import { searchReducer } from './search-reducer';

const rootReducer = combineReducers({
	burger: burgerReducer,
	accordion: accordionReducer,
	search: searchReducer,
	card: cardReducer,
	comments: commentsReducer,
	books: booksReducer,
	categories: categoriesReducer,
	currentBook: currentBookReducer,
	loader: loaderReducer,
	modalError: modalErrorReducer,
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
