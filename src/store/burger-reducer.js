const stateDefault = {
	isBurger: false,
};

const TOGGLE_BURGER = 'TOGGLE_BURGER';

export const burgerReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case TOGGLE_BURGER:
			return { ...state, isBurger: action.value };
		default:
			return state;
	}
};

export const toggleBurgerMenu = (value) => ({ type: TOGGLE_BURGER, value });
