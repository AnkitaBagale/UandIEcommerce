export const loginFormSubmit = async (
	event,
	{ setError, setLoading, loginUser, email, password, from },
) => {
	event.preventDefault();
	setLoading(true);
	setError('');

	const res = await loginUser({
		email,
		password,
		from,
	});

	if (res?.status === 401) {
		setError(res?.data?.message || 'please try again!');
		setLoading(false);
	}
	if (res?.status === 500) {
		setError('please try again!');
		setLoading(false);
	}
};
