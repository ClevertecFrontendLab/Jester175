import {combineReducers,createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { accordionReducer } from './accordion-reducer';
import { burgerReducer } from './burger-reducer'

const rootReducer = combineReducers ({
    burger: burgerReducer,
    accordion: accordionReducer,
})

export const store = createStore(rootReducer, composeWithDevTools());
