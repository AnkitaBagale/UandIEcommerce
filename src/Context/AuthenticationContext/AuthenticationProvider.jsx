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

	const signUpNewUser = async ({
		email,
		password,
		firstname,
		lastname,
		from,
		setLoading,
		setError,
	}) => {
		try {
			const {
				data: {
					response: { firstname: userName, token },
				},
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

			if (status === 201) {
				localStorage?.setItem(
					'session',
					JSON.stringify({
						userName,
						token: token,
					}),
				);
				dispatch({
					type: 'LOGIN_USER',
					payload: { userName, token },
				});
				axios.defaults.headers.common['Authorization'] = token;
				setLoading(false);
				navigate(from);
			} else {
				throw new Error();
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(
				error?.response?.data?.message ||
					'Something went wrong, please try again!',
			);
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
				state,
				dispatch,
			}}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthenticationContext);
