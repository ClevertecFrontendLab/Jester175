const stateDefault = {
	isComments: false,
};

const CLICK_COMMENTS = 'CLICK_COMMENTS';

export const commentsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case CLICK_COMMENTS:
			return { ...state, isComments: action.value };
		default:
			return state;
	}
};

export const clickComments = (value) => ({ type: CLICK_COMMENTS, value });
