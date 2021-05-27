export const defaultErrors = {
	nameError: '',
	streetAddressError: '',
	cityError: '',
	stateError: '',
	countryError: '',
	zipCodeError: '',
	phoneNumberError: '',
};

export const errorsReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_NAME_ERROR': {
			return { ...state, nameError: payload };
		}
		case 'SET_COUNTRY_ERROR': {
			return { ...state, countryError: payload };
		}
		case 'SET_STREET_ERROR': {
			return { ...state, streetAddressError: payload };
		}
		case 'SET_CITY_ERROR': {
			return { ...state, cityError: payload };
		}
		case 'SET_STATE_ERROR': {
			return { ...state, stateError: payload };
		}
		case 'SET_ZIPCODE_ERROR': {
			return { ...state, zipCodeError: payload };
		}
		case 'SET_PHONE_NUMBER_ERROR': {
			return { ...state, phoneNumberError: payload };
		}
		case 'CLEAR_ERRORS': {
			return { ...defaultErrors };
		}
		case 'SET_ALL_ERRORS': {
			return { ...payload };
		}
		default:
			return state;
	}
};
