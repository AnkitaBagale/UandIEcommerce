export const ErrorMessage = ({ message }) => {
	return (
		<div
			style={{
				display: 'block',
			}}
			className='form-validation-msg form-field-error'>
			<span className='form-field-symbol'>
				<i className='fas fa-exclamation-circle'></i>
			</span>
			{message}
		</div>
	);
};
