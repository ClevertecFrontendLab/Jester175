const stateDefault = {
	modalErr: false
};

const ERROR_MODAL = 'ERROR_MODAL';

export const modalReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ERROR_MODAL:
			return { ...state, modalErr: action.value };
		default:
			return state;
	}
};

export const showModalError = (value) => ({ type: ERROR_MODAL, value });
