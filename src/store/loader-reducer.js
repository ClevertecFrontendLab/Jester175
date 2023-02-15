const stateDefault = {
	isLoading: true,
};

const LOADING = 'LOADING';

export const loaderReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, isLoading: action.value };
		default:
			return state;
	}
};

export const setLoading = (value) => ({ type: LOADING, value });
