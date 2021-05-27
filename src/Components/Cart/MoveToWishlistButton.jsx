import { useEffect, useRef } from 'react';

import { useAuthentication, useStateContext } from '../../Context';
import {
	addProductToWishlist,
	isAlreadyAdded,
	removeProductFromCart,
} from '../../utils';

export const MoveToWishlistButton = ({
	product,
	setMessage,
	disableButtonWhileProcessing,
	setDisableButton,
}) => {
	const { state, dispatch } = useStateContext();

	let isRendered = useRef(false);
	const {
		state: { token },
	} = useAuthentication();

	useEffect(() => {
		isRendered.current = true;
		return () => {
			isRendered.current = false;
		};
	}, []);

	return (
		<button
			disabled={disableButtonWhileProcessing}
			className={
				disableButtonWhileProcessing
					? 'btn btn-outline-secondary btn-disabled'
					: 'btn btn-outline-secondary'
			}
			onClick={() => {
				if (!isAlreadyAdded(state.itemsInWishlist, product._id)) {
					addProductToWishlist({
						state,
						dispatch,
						setMessage,
						setDisableButton,
						product,
						isRendered,
						token,
					});
				}

				removeProductFromCart({
					state,
					dispatch,
					setMessage,
					setDisableButton,
					product,
					isRendered,
					token,
				});
			}}>
			Move to Wishlist
		</button>
	);
};
