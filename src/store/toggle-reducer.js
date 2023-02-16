const stateDefault = {
	isSearch: false,
	isBurger: false,
	isAccordion: true,
    cardView: 'groupByTile',
};

const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
const TOGGLE_BURGER = 'TOGGLE_BURGER';
const TOGGLE_ACCORDION = 'TOGGLE_ACCORDION';
const TOGGLE_VIEW = 'TOGGLE_VIEW';

export const toggleReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case TOGGLE_SEARCH:
			return { ...state, isSearch: action.value };
		case TOGGLE_BURGER:
			return { ...state, isBurger: action.value };
		case TOGGLE_ACCORDION:
			return { ...state, isAccordion: action.value };
		case TOGGLE_VIEW:
			return { ...state, cardView: action.value };
		default:
			return state;
	}
};

export const clickSearch = (value) => ({ type: TOGGLE_SEARCH, value });
export const toggleBurgerMenu = (value) => ({ type: TOGGLE_BURGER, value });
export const toggleAccordion = (value) => ({ type: TOGGLE_ACCORDION, value });
export const clickCardView = (value) => ({ type: TOGGLE_VIEW, value });
