const stateDefault = {
	registration: {
        status: null,
    },
	auth: {
        authorized: false,
        status: null,
    },
	restore: false,
	data: {},
};

const TOGGLE_REGISTRATION = 'TOGGLE_REGISTRATION';
const TOGGLE_AUTH = 'TOGGLE_AUTH';
const TOGGLE_RESTORE = 'TOGGLE_RESTORE';
const SET_DATA = 'SET_DATA';

export const authReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case TOGGLE_REGISTRATION:
			return { ...state, registration: {...state.registration, ...action.value} };
		case TOGGLE_AUTH:
			return { ...state, auth: {...state.auth, ...action.value} };
		case TOGGLE_RESTORE:
			return { ...state, restore: action.value };
		case SET_DATA:
			return { ...state, data: { ...state.data, ...action.data } };
		default:
			return state;
	}
};

export const toggleRegistration = (value) => ({ type: TOGGLE_REGISTRATION, value });
export const toggleAuth = (value) => ({ type: TOGGLE_AUTH, value });
export const toggleRestore = (value) => ({ type: TOGGLE_RESTORE, value });
export const setData = (data) => ({ type: SET_DATA, data });
