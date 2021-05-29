import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { addProductToWishlist, isAlreadyAdded } from '../../utils';
import { useAuthentication, useStateContext } from '../../Context';

export const LikeButton = ({
	product,
	setMessage,
	disableButtonWhileProcessing,
	setDisableButton,
}) => {
	const { state, dispatch } = useStateContext();
	const navigate = useNavigate();
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
			className={
				disableButtonWhileProcessing
					? 'like-btn link-no-style btn-disabled'
					: 'like-btn link-no-style'
			}
			disabled={disableButtonWhileProcessing}
			style={{
				color: isAlreadyAdded(state.itemsInWishlist, product._id)
					? 'var(--primary-color)'
					: '',
			}}
			onClick={() => {
				token
					? addProductToWishlist({
							state,
							dispatch,
							setMessage,
							setDisableButton,
							product,
							isRendered,
							token,
					  })
					: navigate('/login');
			}}>
			<span>
				<i className='fas fa-heart'></i>
			</span>
		</button>
	);
};
