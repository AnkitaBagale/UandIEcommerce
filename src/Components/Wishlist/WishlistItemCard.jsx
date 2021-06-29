import { useEffect, useRef, useState } from 'react';

import { useAuthentication, useStateContext } from '../../Context';
import { AddToCartButton } from '../Cart';
import { addProductToWishlist, trimCharacters } from '../../utils';
import { Toast } from '../Toast';
import { Link } from 'react-router-dom';

export const WishlistItemCard = ({ product }) => {
	const { state, dispatch } = useStateContext();
	const [message, setMessage] = useState({ msg: '', msgType: '' });
	const [disableButtonWhileProcessing, setDisableButton] = useState(false);
	const {
		state: { token },
	} = useAuthentication();
	let isRendered = useRef(null);

	useEffect(() => {
		isRendered.current = true;

		return () => {
			isRendered.current = false;
		};
	});

	return (
		<>
			{message.msgType === 'toast-inform' && <Toast {...message} />}
			{message.msgType === 'toast-success' && <Toast {...message} />}
			{message.msgType === 'toast-error' && <Toast {...message} />}

			<div to={`/shop/${product._id}`} className='card-vertical shadow-box'>
				<button
					disabled={disableButtonWhileProcessing}
					type='button'
					className={
						disableButtonWhileProcessing
							? 'btn-close btn-disabled'
							: 'btn-close'
					}
					onClick={() => {
						addProductToWishlist({
							state,
							dispatch,
							setMessage,
							setDisableButton,
							product,
							isRendered,
							token,
						});
					}}></button>
				<div className='image-container badge-container'>
					<Link to={`/shop/${product._id}`} className='link-no-style'>
						<img
							className='img-responsive card-img product-card-img'
							src={product.image}
							alt={product.name}
						/>
					</Link>
					<span
						style={{ display: product.inStock ? 'none' : 'block' }}
						className='badge bg-secondary'>
						sold out
					</span>
				</div>
				<div className='text-container'>
					<div className='text-container-title'>
						<Link to={`/shop/${product._id}`} className='link-no-style'>
							<h6 className='p text-regular-weight product-title'>
								{product.brand}
							</h6>
						</Link>
					</div>
					<div className='text-container-desc'>
						<p className='body-cp-md'>{trimCharacters(product.name)}</p>
						<p className='text-regular-weight body-cp-md'>
							Rs.{product.price}
							<span className='text-light-weight'>
								<span className='primary-text-color body-cp-sm'>
									{' '}
									({product.offer}% OFF)
								</span>
							</span>
						</p>
					</div>
					<div className='CTA-Container'>
						<AddToCartButton
							key={product._id}
							product={product}
							setMessage={setMessage}
							disableButtonWhileProcessing={disableButtonWhileProcessing}
							setDisableButton={setDisableButton}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
