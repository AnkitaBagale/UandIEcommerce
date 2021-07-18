import { useReducer, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { InputPasswordField } from '../InputPasswordField';
import Loader from 'react-loader-spinner';
import { useAuthentication } from '../../../Context';

export const SignUp = () => {
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [showSuccess, setSuccess] = useState(false);

	const { state } = useLocation();

	const navigateToPathState = { from: state?.from ? state.from : '/' };
	const {
		signUpNewUser,
		state: { token },
	} = useAuthentication();

	const errorsInitialState = {
		emailError: '',
		passwordError: '',
		confirmPasswordError: '',
		firstnameError: '',
		lastnameError: '',
	};

	const errorReducer = (state, { type, payload }) => {
		switch (type) {
			case 'SET_FIRSTNAME_ERROR':
				return { ...state, firstnameError: payload };

			case 'SET_LASTNAME_ERROR':
				return { ...state, lastnameError: payload };

			case 'SET_EMAIL_ERROR':
				return { ...state, emailError: payload };

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
	const initialState = {
		email: '',
		password: '',
		confirmPassword: '',
		firstname: '',
		lastname: '',
	};

	const formReducer = (state, { type, payload }) => {
		switch (type) {
			case 'SET_FIRSTNAME':
				return { ...state, firstname: payload };

			case 'SET_LASTNAME':
				return { ...state, lastname: payload };

			case 'SET_EMAIL':
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

	const checkFormValidity = () => {
		let errorFlag = true;
		if (
			formState.firstname === '' ||
			!/^[a-zA-Z]+(\s*\w*)*$/.test(formState.firstname)
		) {
			errorsDispatch({
				type: 'SET_FIRSTNAME_ERROR',
				payload: 'Please enter valid name',
			});
			errorFlag = false;
		}
		if (
			formState.lastname === '' ||
			!/^[a-zA-Z]+(\s*\w*)*$/.test(formState.lastname)
		) {
			errorsDispatch({
				type: 'SET_LASTNAME_ERROR',
				payload: 'Please enter valid surname',
			});
			errorFlag = false;
		}
		if (formState.email === '' || !/^.+@.+\.com$/.test(formState.email)) {
			errorsDispatch({
				type: 'SET_EMAIL_ERROR',
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

	const submitSignUpForm = async (e, firstname, lastname, email, password) => {
		e.preventDefault();
		setError('');
		if (checkFormValidity()) {
			setLoading(true);
			const response = await signUpNewUser({
				firstname,
				lastname,
				email,
				password,
			});
			if (response?.status === 201) {
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
		<>
			{token ? (
				<Navigate to='/profile' replace />
			) : (
				<div className='form-container shadow-box overlay-container'>
					{!showSuccess ? (
						<>
							<h1 className='h4 text-center'>SIGN UP</h1>
							<p className='text-center padding-bottom-1rem'>
								Fill below form to sign up and enjoy special offers in U&I store
							</p>
							<form className='submit-form-example display-flex-column'>
								<div className='row'>
									<div className='column-30-pc column1'>
										<label className='form-label text-regular-weight body-cp-md form-label-required-field'>
											First Name
										</label>
									</div>

									<div className='column-70-pc'>
										<input
											className='form-field'
											placeholder='Enter your first name'
											value={formState.firstname}
											onChange={(e) => {
												formDispatch({
													type: 'SET_FIRSTNAME',
													payload: e.target.value,
												});
											}}
											onFocus={() => {
												onFocusClearError('SET_FIRSTNAME_ERROR');
											}}
										/>
										<div
											style={{
												display: fieldErrors.firstnameError ? 'block' : 'none',
											}}
											className='form-validation-msg form-field-error'>
											<span className='form-field-symbol'>
												<i className='fas fa-exclamation-circle'></i>
											</span>
											{fieldErrors.firstnameError}
										</div>
									</div>
								</div>

								<div className='row'>
									<div className='column-30-pc column1'>
										<label className='form-label text-regular-weight body-cp-md form-label-required-field'>
											Last Name
										</label>
									</div>

									<div className='column-70-pc'>
										<input
											className='form-field'
											placeholder='Enter your last name'
											value={formState.lastname}
											onChange={(e) => {
												formDispatch({
													type: 'SET_LASTNAME',
													payload: e.target.value,
												});
											}}
											onFocus={() => {
												onFocusClearError('SET_LASTNAME_ERROR');
											}}
										/>
										<div
											style={{
												display: fieldErrors.lastnameError ? 'block' : 'none',
											}}
											className='form-validation-msg form-field-error'>
											<span className='form-field-symbol'>
												<i className='fas fa-exclamation-circle'></i>
											</span>
											{fieldErrors.lastnameError}
										</div>
									</div>
								</div>

								<div className='row'>
									<div className='column-30-pc column1'>
										<label className='form-label text-regular-weight body-cp-md form-label-required-field'>
											Email
										</label>
									</div>

									<div className='column-70-pc'>
										<input
											className='form-field'
											placeholder='example@example.com'
											value={formState.email}
											onChange={(e) => {
												formDispatch({
													type: 'SET_EMAIL',
													payload: e.target.value,
												});
											}}
											onFocus={() => {
												onFocusClearError('SET_EMAIL_ERROR');
											}}
										/>
										<div
											style={{
												display: fieldErrors.emailError ? 'block' : 'none',
											}}
											className='form-validation-msg form-field-error'>
											<span className='form-field-symbol'>
												<i className='fas fa-exclamation-circle'></i>
											</span>
											{fieldErrors.emailError}
										</div>
									</div>
								</div>

								<div className='row'>
									<div className='column-30-pc column1'>
										<label className='form-label text-regular-weight body-cp-md form-label-required-field'>
											Password
										</label>
									</div>

									<div className='column-70-pc'>
										<InputPasswordField
											placeholderText={'Enter new password'}
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
								</div>

								<div className='row'>
									<div className='column-30-pc column1'>
										<label className='form-label text-regular-weight body-cp-md form-label-required-field'>
											Confirm Password
										</label>
									</div>

									<div className='column-70-pc'>
										<InputPasswordField
											placeholderText={'Re-type your password'}
											value={formState.confirmPassword}
											onChangeHandler={(e) => {
												formDispatch({
													type: 'SET_RE_PASSWORD',
													payload: e.target.value,
												});
											}}
											onFocusHandler={() => {
												onFocusClearError('SET_RE_PASSWORD_ERROR');
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
								</div>

								<button
									className='btn btn-solid-primary'
									type='submit'
									onClick={(e) =>
										submitSignUpForm(
											e,
											formState.firstname,
											formState.lastname,
											formState.email,
											formState.password,
										)
									}>
									REGISTER
								</button>
								<div className='body-cp-md padding-bottom-1rem'>
									Already registered?{' '}
									<Link
										to='/login'
										state={navigateToPathState}
										className='link-text link-text-primary'>
										Login here
									</Link>
								</div>
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
									<Loader
										type='TailSpin'
										color='#ff3f6c'
										height={80}
										width={80}
									/>
								</div>
							)}
						</>
					) : (
						<div className='text-center'>
							<h5>Thank you for signing up!</h5>
							<p className='body-cp-lg'>Please login to continue.</p>
							<Link
								to={'/login'}
								state={navigateToPathState}
								className='btn btn-solid-primary'>
								Login
							</Link>
						</div>
					)}
				</div>
			)}
		</>
	);
};
