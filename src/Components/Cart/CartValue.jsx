import { useEffect, useState } from 'react';
import { useStateContext } from '../../Context';
import './cart.css';

import { OffersModal } from './OffersModal';

import { useOrderSummary } from './utils/useOrderSummary';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Checkout } from './Checkout';
import { OrderSummary } from './OrderSummary';
import { useSelectedAddress } from './utils';
import { ErrorMessage } from './ErrorMessage';

export const CartValue = ({ status, setStatus, setOrderId }) => {
	const { state } = useStateContext();
	const [userSelectedCoupon, setCoupon] = useState({
		couponName: '',
		couponPrice: 0,
		minOrderValue: '',
	});
	const [showOfferModal, setOfferModal] = useState(false);
	const [showPaymentOptions, setPaymentOptions] = useState(false);

	const { cartTotalWithoutOffer, cartTotal } = useOrderSummary({
		userSelectedCoupon,
	});
	const { selectedAddress } = useSelectedAddress();

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
			<button
				disabled={selectedAddress ? false : true}
				onClick={() => setPaymentOptions(true)}
				className={`btn btn-solid-primary ${
					selectedAddress ? '' : 'btn-disabled'
				}`}>
				Place Order
			</button>
			{!selectedAddress && (
				<ErrorMessage message='Select address to checkout!' />
			)}

			{showPaymentOptions && (
				<div className={'modal-interstitial active'}>
					<div className='modal-content display-flex-items'>
						<button
							onClick={() => setPaymentOptions(false)}
							type='button'
							className='btn-close modal-close'></button>

						<PayPalScriptProvider options={options}>
							<Checkout
								userSelectedCoupon={userSelectedCoupon}
								setStatus={setStatus}
								setOrderId={setOrderId}
							/>
						</PayPalScriptProvider>
					</div>
				</div>
			)}

			{status === 'FAILURE' && (
				<ErrorMessage message='Payment is cancelled or failed! Please try again!' />
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
