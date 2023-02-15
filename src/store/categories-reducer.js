const stateDefault = {
	categories: [],
};

const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const categoriesReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ADD_CATEGORIES:
			return { ...state, categories: [{ name: 'Все книги', path: 'all', id: 0 }, ...action.categories] };
		default:
			return state;
	}
};

export const addCategories = (categories) => ({ type: ADD_CATEGORIES, categories });
