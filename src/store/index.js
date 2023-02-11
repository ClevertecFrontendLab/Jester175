import {applyMiddleware,combineReducers,createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

import { accordionReducer } from './accordion-reducer';
import { booksReducer } from './books-reducer';
import { burgerReducer } from './burger-reducer'
import { cardReducer } from './card-reducer';
import { commentsReducer } from './comments-reducer';
import { searchReducer } from './search-reducer';

const rootReducer = combineReducers ({
    burger: burgerReducer,
    accordion: accordionReducer,
    search: searchReducer,
    card: cardReducer,
    comments: commentsReducer,
    books: booksReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
