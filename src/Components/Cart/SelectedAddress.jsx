import '../Authentication/Profile/profile.css';
import { ErrorMessage } from './ErrorMessage';
import { useSelectedAddress } from './utils';
export const SelectAddress = ({ setShowModal }) => {
	const { selectedAddress } = useSelectedAddress();

	return (
		<>
			<div className='margin-bottom-8px'>
				<div className='card-horizontal border-width-1px'>
					<div className='text-container display-flex-row'>
						{selectedAddress ? (
							<div>
								<div className='body-cp-md'>
									Deliver to:{' '}
									<span className='text-regular-weight'>
										{`${selectedAddress.name}, ${selectedAddress.zipCode}`}
									</span>
								</div>
								<div className='body-cp-sm margin-top-8px'>
									{`${selectedAddress.streetAddress}, ${selectedAddress.city}`}
								</div>
							</div>
						) : (
							<div className='body-cp-md'>
								Deliver to:
								<div className='body-cp-md'>Address not selected</div>
							</div>
						)}
						<button
							className='btn btn-sm-size btn-outline-primary margin-0'
							onClick={() => setShowModal(true)}>
							Change
						</button>
					</div>
				</div>
				{!selectedAddress && (
					<ErrorMessage message='Select address to checkout!' />
				)}
			</div>
		</>
	);
};
