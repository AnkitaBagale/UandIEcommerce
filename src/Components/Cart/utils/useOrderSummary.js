import { useStateContext } from '../../../Context';
import { cartDetailsCalculator } from './cart-details-calculator';

export const useOrderSummary = ({ userSelectedCoupon }) => {
	const { state } = useStateContext();
	const cartDetails = cartDetailsCalculator(state.itemsInCart.products);
	const cartTotalWithoutOffer = cartDetails.totalMRP - cartDetails.discount;
	const cartTotal =
		cartDetails.totalMRP -
		cartDetails.discount -
		Number(userSelectedCoupon?.couponPrice || 0);

	return {
		total: cartDetails.totalMRP.toFixed(2),
		discount: cartDetails.discount.toFixed(2),
		couponDiscount: userSelectedCoupon?.couponPrice || 0,
		cartTotalWithoutOffer: cartTotalWithoutOffer.toFixed(2),
		cartTotal: cartTotal.toFixed(2),
	};
};
