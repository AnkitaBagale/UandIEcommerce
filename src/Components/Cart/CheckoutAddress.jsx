import { useSelectedAddress } from './utils';

export const CheckoutAddress = () => {
	const { selectedAddress } = useSelectedAddress();
	return (
		<div className='text-container secondary-text-color'>
			{selectedAddress && (
				<>
					<h4 className='body-cp-rg'>
						Delivery address:{' '}
						<span className='body-cp-rg'>
							{selectedAddress?.name} | {selectedAddress?.phoneNumber}
						</span>
					</h4>

					<p className='body-cp-md'>{selectedAddress?.streetAddress}</p>

					<p className='body-cp-md'>{`${selectedAddress?.city}, ${selectedAddress?.state} ${selectedAddress?.zipCode}`}</p>

					<p className='body-cp-md'>{selectedAddress?.country}</p>
				</>
			)}
			{}
		</div>
	);
};
