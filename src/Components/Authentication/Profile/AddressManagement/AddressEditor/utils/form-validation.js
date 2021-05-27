export const formValidation = (formState, errorsDispatch) => {
	const newErrors = {
		nameError: !formState.name.trim() ? 'Please fill the name!' : '',

		streetAddressError: !formState.streetAddress.trim()
			? 'Please fill the address!'
			: '',

		cityError: !formState.city.trim() ? 'Please fill the city!' : '',

		zipCodeError: !/^[1-9][0-9]{4}[1-9]$/.test(formState.zipCode)
			? 'Please enter valid zip code!'
			: '',

		phoneNumberError: !/^(\+91)?\s?[1-9][0-9]{9}$/.test(formState.phoneNumber)
			? 'Please enter valid phone number!'
			: '',
	};
	errorsDispatch({ type: 'SET_ALL_ERRORS', payload: newErrors });
	if (
		newErrors.nameError ||
		newErrors.streetAddressError ||
		newErrors.cityError ||
		newErrors.zipCodeError ||
		newErrors.phoneNumberError
	) {
		return false;
	} else {
		return true;
	}
};
