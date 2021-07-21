import React, { useReducer, useState } from 'react';
import { statesInCountryWise, countries } from '../../../../../database';
import {
	formReducer,
	errorsReducer,
	defaultAddress,
	defaultErrors,
} from './reducers';
import { useAuthentication } from '../../../../../Context';
import axios from 'axios';
import { API_URL } from '../../../../../utils';
import { formValidation } from './utils';

export const AddressEditor = ({
	existingAddress = defaultAddress,
	setEditMode,
	setAddNew,
}) => {
	const [formState, formDispatch] = useReducer(formReducer, {
		...existingAddress,
	});

	const [apiError, setApiError] = useState('');

	const [fieldErrors, errorsDispatch] = useReducer(
		errorsReducer,
		defaultErrors,
	);
	const {
		state: { token },
		dispatch,
	} = useAuthentication();

	const onFocusClearError = (type) => {
		errorsDispatch({ type, payload: '' });
	};

	const submitFormHandler = async () => {
		try {
			setApiError('');
			if (formValidation(formState, errorsDispatch)) {
				let url = `${API_URL}/addresses`;

				const addAddress = {
					name: formState.name,
					streetAddress: formState.streetAddress,
					city: formState.city,
					state: formState.state
						? formState.state
						: statesInCountryWise[formState.country].states[0],
					country: formState.country,
					zipCode: formState.zipCode,
					phoneNumber: formState.phoneNumber,
				};

				if (existingAddress._id !== null) {
					url = `${API_URL}/addresses/${existingAddress._id}`;
				}

				const {
					data: { response },
				} = await axios({
					method: 'POST',
					url,
					data: addAddress,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				dispatch({
					type: 'SET_ADDRESS_DETAILS',
					payload: { addressDetails: response },
				});
				document.body.style.overflow = 'visible';

				existingAddress._id !== null ? setEditMode(false) : setAddNew(false);
			}
		} catch (error) {
			console.log(error);
			setApiError('Please try again');
		}
	};

	return (
		<>
			<div className='modal-interstitial active'>
				<div className='modal-content vertical-middle'>
					<div>
						<h2 className='body-cp-rg padding-bottom-1rem'>ADD NEW ADDRESS</h2>
						<div className='row'>
							<select
								className='form-field'
								value={formState.country}
								onChange={(e) => {
									formDispatch({
										type: 'SET_COUNTRY',
										payload: e.target.value,
									});
								}}>
								{countries.map((countryName) => (
									<option key={countryName} value={countryName}>
										{countryName}
									</option>
								))}
							</select>
						</div>

						<div className='row'>
							<input
								className='form-field'
								type='text'
								placeholder='Enter name'
								value={formState.name}
								onChange={(e) => {
									formDispatch({ type: 'SET_NAME', payload: e.target.value });
								}}
								onFocus={() => {
									onFocusClearError('SET_NAME_ERROR');
								}}
							/>

							<div
								className='form-validation-msg form-field-error'
								style={{
									display: fieldErrors.nameError === '' ? 'none' : 'block',
								}}>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.nameError}
							</div>
						</div>
						<div className='row'>
							<input
								className='form-field'
								type='text'
								placeholder='Enter house no., street, colony'
								value={formState.streetAddress}
								onChange={(e) => {
									formDispatch({
										type: 'SET_STREET',
										payload: e.target.value,
									});
								}}
								onFocus={() => {
									onFocusClearError('SET_STREET_ERROR');
								}}
							/>
							<div
								className='form-validation-msg form-field-error'
								style={{
									display:
										fieldErrors.streetAddressError === '' ? 'none' : 'block',
								}}>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.streetAddressError}
							</div>
						</div>
						<div className='row'>
							<input
								className='form-field'
								type='text'
								placeholder='Enter city'
								value={formState.city}
								onChange={(e) => {
									formDispatch({ type: 'SET_CITY', payload: e.target.value });
								}}
								onFocus={() => {
									onFocusClearError('SET_CITY_ERROR');
								}}
							/>
							<div
								className='form-validation-msg form-field-error'
								style={{
									display: fieldErrors.cityError === '' ? 'none' : 'block',
								}}>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.cityError}
							</div>
						</div>
						<div className='row'>
							<select
								className='form-field'
								value={formState.state}
								onChange={(e) => {
									formDispatch({
										type: 'SET_STATE',
										payload: e.target.value,
									});
								}}>
								{statesInCountryWise[formState.country].states.map(
									(stateName) => (
										<option key={stateName} value={stateName}>
											{stateName}
										</option>
									),
								)}
							</select>
						</div>
						<div className='row'>
							<input
								className='form-field'
								placeholder='Enter zip code'
								value={formState.zipCode}
								onChange={(e) => {
									formDispatch({
										type: 'SET_ZIPCODE',
										payload: e.target.value,
									});
								}}
								onFocus={() => {
									onFocusClearError('SET_ZIPCODE_ERROR');
								}}
							/>
							<div
								className='form-validation-msg form-field-error'
								style={{
									display: fieldErrors.zipCodeError === '' ? 'none' : 'block',
								}}>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.zipCodeError}
							</div>
						</div>
						<div className='row'>
							<input
								className='form-field'
								type='text'
								placeholder='Enter mobile number'
								value={formState.phoneNumber}
								onChange={(e) => {
									formDispatch({
										type: 'SET_PHONE_NUMBER',
										payload: e.target.value,
									});
								}}
								onFocus={() => {
									onFocusClearError('SET_PHONE_NUMBER_ERROR');
								}}
							/>
							<div
								className='form-validation-msg form-field-error'
								style={{
									display:
										fieldErrors.phoneNumberError === '' ? 'none' : 'block',
								}}>
								<span className='form-field-symbol'>
									<i className='fas fa-exclamation-circle'></i>
								</span>
								{fieldErrors.phoneNumberError}
							</div>
						</div>

						<div className='CTA-Container'>
							<button
								className='btn btn-solid-primary btn-sm-size'
								type='submit'
								onClick={submitFormHandler}>
								Save
							</button>

							<button
								className='btn btn-outline-primary btn-sm-size'
								onClick={() => {
									errorsDispatch({ type: 'CLEAR_ERRORS' });
									formDispatch({ type: 'FILL_DUMMY_ADDRESS' });
								}}
								type='button'>
								Fill with Dummy Address
							</button>

							<button
								className='btn btn-outline-primary btn-sm-size'
								onClick={() => {
									document.body.style.overflow = 'visible';
									existingAddress._id !== null
										? setEditMode(false)
										: setAddNew(false);
								}}
								type='button'>
								Cancel
							</button>
						</div>

						<div
							className='form-validation-msg form-field-error'
							style={{ display: apiError === '' ? 'none' : 'block' }}>
							<span className='form-field-symbol'>
								<i className='fas fa-exclamation-circle'></i>
							</span>
							{apiError}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
