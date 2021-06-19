import '../Authentication/Profile/profile.css';
import { useSelectedAddress } from './utils';
export const SelectedAddressOnCheckout = ({ setShowModal }) => {
	const { selectedAddress } = useSelectedAddress();

	return (
		<>
			<div className='margin-bottom-8px'>
				<div className='card-horizontal border-width-1px'>
					<div className='text-container display-flex-row'>
						{selectedAddress ? (
							<div className='body-cp-md'>
								Deliver to:
								<p className='secondary-text-color'>
									<span className='body-cp-md'>
										{selectedAddress.name}, {selectedAddress.streetAddress},{' '}
										{`${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zipCode}`}
										, {selectedAddress.country}
									</span>

									<p className='body-cp-md'>
										Phone number:{selectedAddress.phoneNumber}
									</p>
								</p>
							</div>
						) : (
							<div className='body-cp-md'>
								Deliver to:
								<div className='body-cp-md'>Address not selected</div>
							</div>
						)}
					</div>
				</div>
				{!selectedAddress && (
					<div
						style={{
							display: 'block',
						}}
						className='form-validation-msg form-field-error'>
						<span className='form-field-symbol'>
							<i className='fas fa-exclamation-circle'></i>
						</span>
						Select address to checkout!
					</div>
				)}
			</div>
		</>
	);
};
