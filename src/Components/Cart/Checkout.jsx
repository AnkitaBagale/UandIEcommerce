import { useAuthentication, useStateContext } from '../../Context';
import { API_URL, placeOrder } from '../../utils';
import { useSelectedAddress } from './utils';
import { useOrderSummary } from './utils/useOrderSummary';
import axios from 'axios';
import { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

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
	const [error, setError] = useState(false);

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
		address: `${selectedAddress?.name}, ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.zipCode}`,
	};

	const paymentSuccessful = async () => {
		await placeOrder({
			orderDetails: placedOrderDetails,
			token,
			dispatch,
			setStatus,
			setOrderId,
		});
	};

	const paymentFailure = () => {
		setStatus('FAILURE');
	};

	const loadExternalScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			document.body.appendChild(script);
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
		});
	};

	const showRazorpay = async () => {
		const res = await loadExternalScript(
			'https://checkout.razorpay.com/v1/checkout.js',
		);

		if (!res) {
			setError('Something went wrong! Payment options are not loaded.');
			return;
		}
		const { data } = await axios({
			url: `${API_URL}/orders/razorpay`,
			method: 'POST',
			data: { amount: cartTotal },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		var options = {
			key: process.env.REACT_APP_CLIENT_ID,
			amount: data.amount,
			currency: data.currency,
			name: 'U&I Store',
			description: 'Test Transaction',
			image:
				'https://res.cloudinary.com/u-and-i/image/upload/v1626882606/logos/ktine8eik7bk3ckmdfhz.png',
			order_id: data.id,
			handler: function (response) {
				paymentSuccessful();
			},
			prefill: {
				name: userDetails.firstname + userDetails.lastname,
				email: userDetails.email,
				contact: `91${selectedAddress.phoneNumber}`,
				method: 'netbanking',
			},
			notes: {
				address: `${selectedAddress?.name}, ${selectedAddress?.streetAddress}, ${selectedAddress?.city}, ${selectedAddress?.zipCode}`,
			},
		};
		var paymentObject = new window.Razorpay(options);
		paymentObject.on('payment.failed', function (response) {
			console.log(response.error);
			paymentFailure();
		});
		paymentObject.open();
	};

	return (
		<>
			<button
				disabled={selectedAddress ? false : true}
				onClick={showRazorpay}
				className={`btn btn-solid-primary ${
					selectedAddress ? '' : 'btn-disabled'
				}`}>
				Place Order
			</button>
			{error && <ErrorMessage message={error} />}
			{!selectedAddress && (
				<ErrorMessage message='Select address to check out!' />
			)}
		</>
	);
};
