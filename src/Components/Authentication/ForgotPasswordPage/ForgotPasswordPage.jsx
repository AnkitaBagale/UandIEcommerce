import { useReducer, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link, useLocation } from 'react-router-dom';

import { InputPasswordField } from '../InputPasswordField';
import { useAuthentication } from '../../../Context';

export const ForgotPasswordPage = () => {
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [showSuccess, setSuccess] = useState(false);
	const { updateUserDetails } = useAuthentication();

	const { state } = useLocation();
	const navigateToPathState = { from: state?.from ? state.from : '/' };

	const initialState = {
		email: '',
		password: '',
		confirmPassword: '',
	};

	const formReducer = (state, { type, payload }) => {
		switch (type) {
			case 'SET_USERNAME':
				return { ...state, email: payload };

			case 'SET_PASSWORD':
				return { ...state, password: payload };

			case 'SET_RE_PASSWORD':
				return { ...state, confirmPassword: payload };

			default:
				return state;
		}
	};

	const [formState, formDispatch] = useReducer(formReducer, initialState);

	const errorsInitialState = {
		userNameError: '',
		passwordError: '',
		confirmPasswordError: '',
	};

	const errorReducer = (state, { type, payload }) => {
		switch (type) {
			case 'SET_USERNAME_ERROR':
				return { ...state, userNameError: payload };

			case 'SET_PASSWORD_ERROR':
				return { ...state, passwordError: payload };

			case 'SET_RE_PASSWORD_ERROR':
				return { ...state, confirmPasswordError: payload };

			case 'CLEAR_ERRORS_ERROR':
				return { errorsInitialState };

			default:
				return state;
		}
	};

	const [fieldErrors, errorsDispatch] = useReducer(
		errorReducer,
		errorsInitialState,
	);

	const onFocusClearError = (type) => {
		errorsDispatch({ type, payload: '' });
	};

	const checkFormValidity = () => {
		let errorFlag = true;

		if (formState.email === '' || !/^.+@.+\.com$/.test(formState.email)) {
			errorsDispatch({
				type: 'SET_USERNAME_ERROR',
				payload: 'Please enter valid email id',
			});
			errorFlag = false;
		}
		if (
			formState.password === '' ||
			!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
				formState.password,
			)
		) {
			errorsDispatch({
				type: 'SET_PASSWORD_ERROR',
				payload:
					'Password length should contain minimum 8 characters (at least one capital, small letter and number)',
			});
			errorFlag = false;
		}
		if (
			formState.confirmPassword === '' ||
			formState.password !== formState.confirmPassword
		) {
			errorsDispatch({
				type: 'SET_RE_PASSWORD_ERROR',
				payload: 'Password does not match',
			});
			errorFlag = false;
		}

		return errorFlag;
	};

	const formSubmitHandler = async (e) => {
		setError('');
		e.preventDefault();

		if (checkFormValidity()) {
			setLoading(true);

			const response = await updateUserDetails({
				email: formState.email,
				password: formState.password,
			});
			if (response.status === 200) {
				setLoading(false);
				setSuccess(true);
			} else {
				setLoading(false);
				setError(
					response?.data?.message || 'Something went wrong, please try again!',
				);
			}
		}
	};

	return (
		<div className='form-container shadow-box overlay-container'>
			{!showSuccess ? (
				<>
					<h1 className='h4 padding-bottom-1rem text-center'>Reset Password</h1>
					<p>Enter your email and enter new password</p>
					<form className='submit-form-example display-flex-column'>
						<div className='row'>
							<input
								className='form-field'
								placeholder='Enter your email here'
								required
								value={formState.email}
								onChange={(e) => {
									formDispatch({
										type: 'SET_USERNAME',
										payload: e.target.value,
									});
								}}
								onFocus={() => {
									onFocusClearError('SET_USERNAME_ERROR');
								}}
							/>
							<div
								style={{
									display: fieldErrors.userNameError ? 'block' : 'none',
								}}
								className='form-validation-msg form-field-error'>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.userNameError}
							</div>
						</div>

						<div className='row'>
							<InputPasswordField
								placeholderText={'Enter new password here'}
								value={formState.password}
								onChangeHandler={(e) => {
									formDispatch({
										type: 'SET_PASSWORD',
										payload: e.target.value,
									});
								}}
								onFocusHandler={() => {
									onFocusClearError('SET_PASSWORD_ERROR');
								}}
							/>
							<div
								style={{
									display: fieldErrors.passwordError ? 'block' : 'none',
								}}
								className='form-validation-msg form-field-error'>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.passwordError}
							</div>
						</div>

						<div className='row'>
							<InputPasswordField
								placeholderText={'Re-type your password here'}
								value={formState.confirmPassword}
								onChangeHandler={(e) => {
									formDispatch({
										type: 'SET_RE_PASSWORD',
										payload: e.target.value,
									});
								}}
								onFocusHandler={() => {
									onFocusClearError('SET_PASSWORD_ERROR');
								}}
							/>
							<div
								style={{
									display:
										fieldErrors.confirmPasswordError ||
										formState.password !== formState.confirmPassword
											? 'block'
											: 'none',
								}}
								className='form-validation-msg form-field-error'>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.confirmPasswordError ||
									(formState.password !== formState.confirmPassword
										? 'Password does not match'
										: '')}
							</div>
						</div>

						<button
							className='btn btn-solid-primary'
							type='submit'
							onClick={formSubmitHandler}>
							RESET
						</button>
					</form>
					<div
						style={{
							display: error !== '' ? 'block' : 'none',
							color: '#ff9204',
						}}>
						<span className='form-field-symbol'>
							<i className='fas fa-exclamation-circle'></i>
						</span>
						{error}
					</div>
					{isLoading && (
						<div className='overlay-text'>
							<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
						</div>
					)}
				</>
			) : (
				<div className='text-center'>
					<h5>Your password is set successfully!</h5>
					<p className='body-cp-lg'>Login to continue shopping with us.</p>
					<Link
						to={'/login'}
						state={navigateToPathState}
						className='btn btn-solid-primary'>
						Login
					</Link>
				</div>
			)}
		</div>
	);
};
