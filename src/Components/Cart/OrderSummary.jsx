import { useStateContext } from '../../Context';
import { INDIAN_RUPEE } from '../../utils';
import { useOrderSummary } from './utils/useOrderSummary';

export const OrderSummary = ({ userSelectedCoupon }) => {
	const { total, discount, couponDiscount, cartTotal } = useOrderSummary({
		userSelectedCoupon,
	});
	const { state } = useStateContext();
	return (
		<>
			<div className='p text-regular-weight body-cp-md'>
				PRICE DETAILS: ({state?.itemsInCart?.products.length} items)
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

			<div className='row text-regular-weight body-cp-rg'>
				<div className='column-80-pc'>Total Amount</div>
				<div className='column-20-pc  text-right'>
					{`${INDIAN_RUPEE}${cartTotal}`}
				</div>
			</div>
		</>
	);
};
