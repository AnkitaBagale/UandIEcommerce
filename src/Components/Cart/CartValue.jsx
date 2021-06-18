import { useEffect, useState } from 'react';
import { useStateContext } from '../../Context';
import './cart.css';

import { OffersModal } from './OffersModal';

import { useOrderSummary } from './utils/useOrderSummary';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Checkout } from './Checkout';
import { OrderSummary } from './OrderSummary';

export const CartValue = () => {
	const { state } = useStateContext();
	const [userSelectedCoupon, setCoupon] = useState({
		couponName: '',
		couponPrice: 0,
		minOrderValue: '',
	});
	const [showOfferModal, setOfferModal] = useState(false);
	const [status, setStatus] = useState();

	const { cartTotalWithoutOffer, cartTotal } = useOrderSummary({
		userSelectedCoupon,
	});

	const options = {
		'client-id': process.env.REACT_APP_CLIENT_ID,
		currency: 'USD',
	};

	useEffect(() => {
		const checkOffersValid = () => {
			if (cartTotalWithoutOffer <= Number(userSelectedCoupon.minOrderValue)) {
				setCoupon({
					couponName: '',
					couponPrice: 0,
					minOrderValue: '',
				});
			}
		};
		checkOffersValid();
	}, [state.itemsInCart.products]);

	return (
		<>
			<div className='text-regular-weight body-cp-md'>COUPONS</div>

			<button
				onClick={() => setOfferModal(true)}
				style={{ textAlign: 'left' }}
				className='btn btn-text-icon-secondary btn-outline-secondary'>
				<span className='btn-icon'>
					<i className='fas fa-tag'></i>
				</span>
				Apply Coupon
			</button>

			<OrderSummary userSelectedCoupon={userSelectedCoupon} />

			<PayPalScriptProvider options={options}>
				<Checkout cartTotal={cartTotal} setStatus={setStatus} />
			</PayPalScriptProvider>

			{status === 'FAILURE' && (
				<div
					style={{
						display: 'block',
					}}
					className='form-validation-msg form-field-error'>
					<span className='form-field-symbol'>
						<i className='fas fa-exclamation-circle'></i>
					</span>
					Payment is cancelled or failed! Please try again!
				</div>
			)}

			{showOfferModal && (
				<OffersModal
					setOfferModal={setOfferModal}
					cartTotalWithoutOffer={cartTotalWithoutOffer}
					userSelectedCoupon={userSelectedCoupon}
					setCoupon={setCoupon}
				/>
			)}
		</>
	);
};
