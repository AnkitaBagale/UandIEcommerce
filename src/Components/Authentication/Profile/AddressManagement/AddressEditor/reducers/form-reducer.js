import { statesInCountryWise, countries } from '../../../../../../database';

export const defaultAddress = {
	_id: null,
	name: '',
	streetAddress: '',
	city: '',
	state: statesInCountryWise[countries[0]][0],
	country: countries[0],
	zipCode: '',
	phoneNumber: '',
};

export const formReducer = (state, { type, payload }) => {
	switch (type) {
		case 'SET_NAME': {
			return { ...state, name: payload };
		}
		case 'SET_COUNTRY': {
			return { ...state, country: payload };
		}
		case 'SET_STREET': {
			return { ...state, streetAddress: payload };
		}
		case 'SET_CITY': {
			return { ...state, city: payload };
		}
		case 'SET_STATE': {
			return { ...state, state: payload };
		}
		case 'SET_ZIPCODE': {
			return { ...state, zipCode: payload };
		}
		case 'SET_PHONE_NUMBER': {
			return { ...state, phoneNumber: payload };
		}
		case 'FILL_DUMMY_ADDRESS': {
			return {
				...state,
				name: 'John Doe',
				streetAddress:
					'#1/4 , 100ft Ring Road, Jp Nagar - 4 Phase, Dollars Colony',
				city: 'Bangalore',
				state: statesInCountryWise[countries[0]][7],
				country: countries[0],
				zipCode: '560078',
				phoneNumber: '5120995324',
			};
		}
		default:
			return state;
	}
};
