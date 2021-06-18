import { useAuthentication, useStateContext } from '../../../Context';

export const useSelectedAddress = () => {
	const {
		state: { addressDetails },
	} = useAuthentication();
	const {
		state: {
			itemsInCart: { addressId },
		},
	} = useStateContext();

	const selectedAddress = addressDetails?.find(
		(address) => address._id === addressId,
	);

	return { selectedAddress };
};
