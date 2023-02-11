const stateDefault = {
	cardView: 'groupByTile',
};

const TOGGLE_VIEW = 'TOGGLE_VIEW';

export const cardReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case TOGGLE_VIEW:
			return { ...state, cardView: action.value };
		default:
			return state;
	}
};

export const clickCardView = (value) => ({ type: TOGGLE_VIEW, value });
