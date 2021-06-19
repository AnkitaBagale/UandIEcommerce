import { coupons } from '../../database';
import { OfferCard } from './OfferCard';

export const OffersModal = ({
	setOfferModal,
	cartTotalWithoutOffer,
	userSelectedCoupon,
	setCoupon,
}) => {
	const disableOffer = (minOrder) => {
		return Number(cartTotalWithoutOffer) <= Number(minOrder);
	};
	const isSelected = (name) => name === userSelectedCoupon.couponName;

	const selectCoupon = (e, { coupon, off, minOrder }) => {
		if (!e.target.checked) {
			setCoupon({
				couponName: '',
				couponPrice: 0,
				minOrderValue: '',
			});
		} else {
			setCoupon({
				couponName: coupon,
				couponPrice: off,
				minOrderValue: minOrder,
			});
		}
	};
	return (
		<div className={'modal-interstitial active'}>
			<div className='modal-content display-flex-items'>
				<button
					onClick={() => setOfferModal(false)}
					type='button'
					className='btn-close modal-close'></button>
				<div className='text-container'>
					<h4 className='modal-title text-center'>Apply Coupon</h4>

					<div className='text-container-desc display-flex-column'>
						<ul className='stacked-list text-left'>
							{coupons.map((offer) => (
								<OfferCard
									offer={offer}
									selectCoupon={selectCoupon}
									disableOffer={disableOffer}
									isSelected={isSelected}
								/>
							))}
						</ul>

						<button
							onClick={() => setOfferModal(false)}
							className='btn btn-solid-primary'>
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
