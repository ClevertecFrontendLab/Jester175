const stateDefault = {
    isAccordion: true,
}

const TOGGLE_ACCORDION = 'TOGGLE_ACCORDION';

export const accordionReducer = (state = stateDefault, action) => {
    switch (action.type) {
		case TOGGLE_ACCORDION:
			return { ...state, isAccordion: action.value };
		default:
			return state;
	}
}

export const toggleAccordion = (value) => ({ type: TOGGLE_ACCORDION, value });
