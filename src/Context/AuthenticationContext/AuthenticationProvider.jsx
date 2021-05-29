import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticationReducer } from './authentication.reducer';
import { API_URL } from '../../utils';
import { setupAuthenticationErrorHandler } from './utils/setupAthenticationErrorHandler';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
	const navigate = useNavigate();

	const { userName: userNameDetails, token: tokenDetails } = JSON.parse(
		localStorage.getItem('session'),
	) || {
		userName: '',
		token: '',
	};

	const initialState = {
		token: tokenDetails,
		userName: userNameDetails,
		userDetails: null,
		addressDetails: null,
	};

	const [state, dispatch] = useReducer(authenticationReducer, initialState);

	const loginUser = async ({ email, password, from }) => {
		try {
			const {
				data: {
					response: { firstname, token },
				},
				status,
			} = await axios({
				method: 'POST',
				url: `${API_URL}/users/authenticate`,
				headers: { email: email, password: password },
			});

			if (status === 200) {
				localStorage?.setItem(
					'session',
					JSON.stringify({
						login: true,
						userName: firstname,
						token: token,
					}),
				);

				dispatch({
					type: 'LOGIN_USER',
					payload: { userName: firstname, token },
				});

				axios.defaults.headers.common['Authorization'] = token;
				navigate(from);
			}
		} catch (error) {
			console.error(error);
			return error.response;
		}
	};

	const signUpNewUser = async ({ email, password, firstname, lastname }) => {
		try {
			const {
				data: { message },
				status,
			} = await axios({
				method: 'POST',
				url: `${API_URL}/users`,
				data: {
					firstname: firstname,
					lastname: lastname,
					email: email,
					password: password,
				},
			});

			return { status };
		} catch (error) {
			console.log(error);
			return error.response;
		}
	};

	const updateUserDetails = async ({ email, password }) => {
		try {
			const { status } = await axios({
				method: 'POST',
				url: `${API_URL}/users/self`,
				data: {
					email,
					password,
				},
			});

			if (status === 200) {
				return { status };
			}
		} catch (error) {
			return error.response;
		}
	};

	const logOutUser = () => {
		delete axios.defaults.headers.common['Authorization'];
		localStorage?.removeItem('session');
		dispatch({ type: 'LOGOUT_USER' });
	};

	useEffect(() => {
		setupAuthenticationErrorHandler(logOutUser, navigate);
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				loginUser,
				logOutUser,
				signUpNewUser,
				updateUserDetails,
				state,
				dispatch,
			}}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthenticationContext);
