import { INDIAN_RUPEE } from '../../utils';

export const OfferCard = ({
	offer: { minOrder, coupon, off },
	selectCoupon,
	disableOffer,
	isSelected,
}) => {
	return (
		<li
			className={
				disableOffer(minOrder) ? 'offer-item greyed-out' : 'offer-item'
			}
			key={coupon}>
			<label
				className='field-label'
				style={{ display: 'block' }}
				htmlFor={coupon}>
				<input
					disabled={disableOffer(minOrder)}
					id={coupon}
					type='checkbox'
					className='form-checkbox-field'
					name='couponCode'
					value={off}
					checked={isSelected(coupon)}
					onChange={(e) => selectCoupon(e, { coupon, off, minOrder })}
				/>

				<span>{coupon}</span>
				<br />

				<span className='body-cp-md'>
					Save {INDIAN_RUPEE}
					{off} on minimum purchase of {minOrder}
				</span>
			</label>
		</li>
	);
};
