import { useEffect, useState } from 'react';
import { useStateContext } from '../../Context';
import './cart.css';
import { Link } from 'react-router-dom';
import { OffersModal } from './OffersModal';
import { INDIAN_RUPEE } from '../../utils';
import { useOrderSummary } from './utils/useOrderSummary';

export const CartValue = () => {
	const { state } = useStateContext();
	const [userSelectedCoupon, setCoupon] = useState({
		couponName: '',
		couponPrice: 0,
		minOrderValue: '',
	});

	const [showOfferModal, setOfferModal] = useState(false);

	const { total, discount, couponDiscount, cartTotalWithoutOffer, cartTotal } =
		useOrderSummary({ userSelectedCoupon });

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
			<div className='column-40-pc padding-1rem-borderbox border-width-2px-left display-flex-column'>
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

				<div className='p text-regular-weight body-cp-md'>
					PRICE DETAILS: ({state.itemsInCart.products.length} items)
				</div>

				<div className='row body-cp-md '>
					<div className='column-80-pc'>Total MRP</div>
					<div className='column-20-pc text-right'>
						{INDIAN_RUPEE}
						{total}
					</div>
				</div>
				<div className='row body-cp-md '>
					<div className='column-80-pc'>Discount on MRP</div>
					<div className='column-20-pc text-right text-green'>
						{INDIAN_RUPEE}
						{discount}
					</div>
				</div>
				{userSelectedCoupon.couponPrice !== 0 && (
					<div className='row body-cp-md '>
						<div className='column-80-pc'>Coupon Discount</div>
						<div className='column-20-pc text-right text-green'>
							{INDIAN_RUPEE}
							{couponDiscount}
						</div>
					</div>
				)}
				<div className='row body-cp-md '>
					<div className='column-80-pc'>Convenience Fee</div>
					<span className='text-strike-through'>{INDIAN_RUPEE}99</span>
					<span className='text-green'>FREE</span>
					<div className='column-20-pc text-right'></div>
				</div>

				<div className='row body-cp-rg text-regular-weight'>
					<div className='column-80-pc'>Total Amount</div>
					<div className='column-20-pc text-right'>
						{INDIAN_RUPEE}
						{cartTotal}
					</div>
				</div>
				<Link to='/checkout' className='btn btn-solid-primary'>
					Place Order
				</Link>
			</div>

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
