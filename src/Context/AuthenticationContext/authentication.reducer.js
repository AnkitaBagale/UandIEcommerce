export const authenticationReducer = (state, { type, payload }) => {
	switch (type) {
		case 'LOGIN_USER': {
			return {
				...state,
				token: payload.token,
				userName: payload.userName,
			};
		}
		case 'LOGOUT_USER': {
			return {
				...state,
				token: '',
				userName: '',
				userDetails: null,
				addressDetails: null,
			};
		}

		case 'SET_USER_DETAILS': {
			return {
				...state,
				userDetails: payload.userDetails,
			};
		}

		case 'SET_ADDRESS_DETAILS': {
			return {
				...state,
				addressDetails: payload.addressDetails,
			};
		}

		default:
			throw new Error('Unhandled type of action');
	}
};
