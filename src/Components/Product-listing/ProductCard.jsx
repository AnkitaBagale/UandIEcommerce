import { useState } from 'react';

import { AddToCartButton } from '../Cart';
import { LikeButton } from './LikeButton';
import { Toast } from '../Toast';
import './styles.css';
import { Link } from 'react-router-dom';
import { trimCharacters } from '../../utils';

export const ProductCard = ({ product }) => {
	const [message, setMessage] = useState({ msg: '', msgType: '' });
	const [disableButtonWhileProcessing, setDisableButton] = useState(false);

	return (
		<>
			{message.msgType === 'toast-inform' && <Toast {...message} />}
			{message.msgType === 'toast-success' && <Toast {...message} />}
			{message.msgType === 'toast-error' && <Toast {...message} />}
			<div className='card-vertical'>
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
						<h6 className='product-title'>
							<Link to={`/shop/${product._id}`} className='link-no-style'>
								{product.brand}
							</Link>
							<LikeButton
								key={product._id}
								product={product}
								setMessage={setMessage}
								disableButtonWhileProcessing={disableButtonWhileProcessing}
								setDisableButton={setDisableButton}
							/>
						</h6>
					</div>
					<div className='text-container-desc'>
						<p className='body-cp-md'>{trimCharacters(product.name)}</p>
						<p className='body-cp-md text-regular-weight'>
							Rs.{product.price}
							<span className='text-light-weight'>
								<span className='primary-text-color body-cp-sm'>
									{' '}
									({product.offer}% OFF)
								</span>
							</span>
						</p>
						<div className='rating-badge'>
							<span className='rating-badge-number'>
								{product.rating.starRating}
							</span>
							<span className='rating-badge-star'>
								<i className='fas fa-star'></i>
							</span>
							<span className='rating-badge-number'>|</span>
							<span className='rating-badge-number'>
								{product.rating.totalReviews}
							</span>
						</div>
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
