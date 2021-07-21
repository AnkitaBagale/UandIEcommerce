import { useEffect, useState } from 'react';
import { useStateContext } from '../../Context';
import './cart.css';

import { OffersModal } from './OffersModal';
import { useOrderSummary } from './utils/useOrderSummary';
import { Checkout } from './Checkout';
import { OrderSummary } from './OrderSummary';
import { ErrorMessage } from './ErrorMessage';

export const CartValue = ({ status, setStatus, setOrderId }) => {
	const { state } = useStateContext();
	const [userSelectedCoupon, setCoupon] = useState({
		couponName: '',
		couponPrice: 0,
		minOrderValue: '',
	});
	const [showOfferModal, setOfferModal] = useState(false);

	const { cartTotalWithoutOffer } = useOrderSummary({
		userSelectedCoupon,
	});

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
			<Checkout
				userSelectedCoupon={userSelectedCoupon}
				setStatus={setStatus}
				setOrderId={setOrderId}
			/>

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
