import { PayPalButtons } from '@paypal/react-paypal-js';
import { useAuthentication, useStateContext } from '../../Context';
import { statesInCountryWise } from '../../database';
import { placeOrder } from '../../utils';
import { OrderSummary } from './OrderSummary';
import { useSelectedAddress } from './utils';
import { useOrderSummary } from './utils/useOrderSummary';
import { SelectedAddressOnCheckout } from './SelectedAddressOnCheckout';

export const Checkout = ({ userSelectedCoupon, setStatus, setOrderId }) => {
	const {
		state: { userDetails, token },
	} = useAuthentication();

	const {
		state: { itemsInCart },
		dispatch,
	} = useStateContext();
	const { selectedAddress } = useSelectedAddress();
	const { total, discount, couponDiscount, cartTotal } = useOrderSummary({
		userSelectedCoupon,
	});

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
						value: (cartTotal * 0.01368).toFixed(2),
						currency_code: 'USD',
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

	const placedOrderDetails = {
		payment: {
			mrp: total,
			discount,
			couponDiscount,
			totalPaid: cartTotal,
		},
		items: itemsInCart?.products?.map(({ productId, quantity }) => {
			const placedOrderItem = {
				productId: productId._id,
				payment: { amount: productId.price, offer: productId.offer },
				quantity,
			};
			return placedOrderItem;
		}),
		addressId: itemsInCart?.addressId,
	};

	const paymentSuccessful = async (data, actions) => {
		await actions.order.capture();
		await placeOrder({
			orderDetails: placedOrderDetails,
			token,
			dispatch,
			setStatus,
			setOrderId,
		});
	};

	const paymentFailure = (data) => {
		setStatus('FAILURE');
	};

	return (
		<div style={{ zIndex: 0, margin: '1.5rem 0 0', margin: 'auto' }}>
			<SelectedAddressOnCheckout />
			<OrderSummary userSelectedCoupon={userSelectedCoupon} />
			<PayPalButtons
				style={{
					color: 'silver',
					label: 'pay',
					tagline: false,
					layout: 'horizontal',
				}}
				createOrder={orderDetails}
				onApprove={paymentSuccessful}
				onError={paymentFailure}
				onCancel={paymentFailure}
			/>
		</div>
	);
};
