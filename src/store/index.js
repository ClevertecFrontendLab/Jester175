import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { commentsReducer } from './comments-reducer';
import { dataReducer } from './data-reducer';
import { statusReducer } from './status-reducer';
import { toggleReducer } from './toggle-reducer';

const rootReducer = combineReducers({
    toggle: toggleReducer,
	comments: commentsReducer,
    data: dataReducer,
	status: statusReducer,
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
