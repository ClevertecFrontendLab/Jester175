const stateDefault = {
	isSearch: false,
};

const TOGGLE_SEARCH = 'TOGGLE_SEARCH';

export const searchReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case TOGGLE_SEARCH:
			return { ...state, isSearch: action.value };
		default:
			return state;
	}
};

export const clickSearch = (value) => ({ type: TOGGLE_SEARCH, value });
