import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthentication, useStateContext } from '../../Context';
import { isAlreadyAdded, addProductToCart } from '../../utils';

export const AddToCartButton = ({
	product,
	setMessage,
	setDisableButton,
	disableButtonWhileProcessing,
	btnSize = 'btn-sm-size',
	btnIcon = false,
}) => {
	const navigate = useNavigate();
	const { state, dispatch } = useStateContext();
	const {
		state: { token },
	} = useAuthentication();

	let isRendered = useRef(false);
	useEffect(() => {
		isRendered.current = true;
		return () => {
			isRendered.current = false;
		};
	}, []);

	return (
		<>
			<button
				disabled={disableButtonWhileProcessing || !product.inStock}
				className={
					disableButtonWhileProcessing || !product.inStock
						? `btn ${
								btnIcon ? 'btn-text-icon-primary' : 'btn-outline-primary'
						  } btn-disabled ${btnSize}`
						: `btn ${
								btnIcon ? 'btn-text-icon-primary' : 'btn-outline-primary'
						  } ${btnSize}`
				}
				onClick={() => {
					token
						? isAlreadyAdded(state?.itemsInCart?.products, product._id)
							? navigate('/cart')
							: addProductToCart({
									setMessage,
									setDisableButton,
									dispatch,
									state,
									product,
									isRendered,
									token,
							  })
						: navigate('/login');
				}}>
				<span
					className='btn-icon'
					style={{ display: btnIcon ? 'inline-block' : 'none' }}>
					<i className='fas fa-shopping-cart'></i>
				</span>
				{!product.inStock
					? 'Out of Stock'
					: isAlreadyAdded(state.itemsInCart.products, product._id)
					? 'Go to Cart'
					: 'Add to Cart'}
			</button>
		</>
	);
};
