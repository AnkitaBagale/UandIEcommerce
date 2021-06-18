import { PayPalButtons } from '@paypal/react-paypal-js';
import { useAuthentication, useStateContext } from '../../Context';
import { statesInCountryWise } from '../../database';
import { useSelectedAddress } from './utils';

export const Checkout = ({ cartTotal, setStatus }) => {
	const {
		state: { userDetails },
	} = useAuthentication();
	const {
		state: { itemsInCart },
		dispatch,
	} = useStateContext();
	const { selectedAddress } = useSelectedAddress();

	const userAddress = {
		address_line_1: selectedAddress?.streetAddress,
		address_line_2: `${selectedAddress?.state} ${selectedAddress?.country}`,
		admin_area_2: selectedAddress?.city,
		admin_area_1: selectedAddress?.state,
		postal_code: `${selectedAddress?.zipCode}`,
		country_code: statesInCountryWise[selectedAddress?.country]?.code,
	};

	const orderDetails = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: Math.round(cartTotal * 0.01368),
					},
					shipping: {
						name: {
							full_name: `${userDetails.firstname} ${userDetails.lastname}`,
						},
						address: userAddress,
					},
				},
			],

			payer: {
				name: {
					given_name: userDetails.firstname,
					surname: userDetails.lastname,
				},

				address: userAddress,
			},
		});
	};

	const paymentSuccessful = async (data, actions) => {
		await actions.order.capture();
		setStatus('SUCCESS');
	};

	const paymentFailure = (data) => {
		setStatus('FAILURE');
	};

	return (
		<div style={{ zIndex: 0, margin: '1.5rem 0 0' }}>
			<PayPalButtons
				style={{
					color: 'silver',
					label: 'pay',
					tagline: false,
					layout: 'horizontal',
				}}
				disabled={!selectedAddress}
				createOrder={orderDetails}
				onApprove={paymentSuccessful}
				onError={paymentFailure}
				onCancel={paymentFailure}
			/>
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
	);
};
