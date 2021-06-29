import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addProductToWishlist, API_URL } from '../../utils';
import { AddToCartButton } from '../Cart';
import { Toast } from '../Toast';
import { isAlreadyAdded } from '../../utils';
import './product-detail.css';
import { useAuthentication, useStateContext } from '../../Context';
import axios from 'axios';

const ratingArray = [1, 2, 3, 4, 5];

export const ProductDetailPage = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState({ msg: '', msgType: '' });
	const [disableButtonWhileProcessing, setDisableButton] = useState(false);

	const productId = useParams();
	const { state, dispatch } = useStateContext();
	const {
		state: { token },
	} = useAuthentication();

	const [productDetails, setProduct] = useState();
	let isRendered = useRef(false);

	const isAddedToWishlist = isAlreadyAdded(
		state.itemsInWishlist,
		productDetails?._id,
	);

	useEffect(() => {
		isRendered.current = true;
		return () => {
			isRendered.current = false;
		};
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/products/${productId?.id}`);
				setProduct(response);
			} catch (error) {
				console.log(error);
				navigate('/error');
			}
		})();
	}, []);

	return (
		<>
			{productDetails ? (
				<>
					{message.msgType === 'toast-inform' && <Toast {...message} />}
					{message.msgType === 'toast-success' && <Toast {...message} />}
					{message.msgType === 'toast-error' && <Toast {...message} />}

					<div className='grid-50-50-layout product-detail-card shadow-box'>
						<div>
							<img
								className='img-responsive product-detail-image'
								alt='product'
								src={productDetails?.image}
							/>
						</div>
						<div className='card-horizontal vertical-middle'>
							<div className='text-container'>
								<h3 className='h5'>{productDetails?.name}</h3>
								<p>{productDetails?.brand}</p>
								<div className='rating-star-container padding-bottom-1rem'>
									{ratingArray.map((item) => (
										<i
											key={item}
											style={{
												color:
													item <= Number(productDetails?.rating?.starRating)
														? '#ffb400'
														: '',
											}}
											className='fas fa-star rating-star-icon'></i>
									))}{' '}
									<span className='secondary-text-color'>
										({productDetails?.rating?.totalReviews} reviews)
									</span>
								</div>
								<p className='h5'>
									<span className='margin-right-8px'>
										Rs.
										{(productDetails?.price *
											(100 - Number(productDetails?.offer))) /
											100}
									</span>
									{Number(productDetails?.offer) > 0 && (
										<>
											<span className='font-size-20px text-strike-through secondary-text-color margin-right-4px'>
												Rs.{productDetails?.price}
											</span>{' '}
											<span className='font-size-20px primary-text-color'>
												({productDetails?.offer}%OFF)
											</span>
										</>
									)}
								</p>
								<p className='body-cp-md text-regular-weight text-green'>
									inclusive of all taxes
								</p>

								<div className='filter-divider-line'></div>

								<ul className='list-style-none styled-list'>
									{productDetails?.fastDelivery && (
										<li className='tertiary-text-color body-cp-md'>
											<i className='fas fa-truck flip-image feature-icon'></i>
											<span>Fast delivery available</span>
										</li>
									)}

									<li className='tertiary-text-color body-cp-md'>
										<i className='fas fa-check-square feature-icon'></i>
										<span>Price displayed is inclusive of GST</span>
									</li>

									<li className='tertiary-text-color body-cp-md'>
										<i
											className={
												productDetails?.inStock
													? 'far fa-calendar-check feature-icon'
													: 'far fa-calendar-times feature-icon'
											}></i>
										<span>
											{productDetails?.inStock
												? 'Currently in stock'
												: 'Out of stock'}
										</span>
									</li>
								</ul>

								<div className='CTA-Container'>
									<AddToCartButton
										product={productDetails}
										setMessage={setMessage}
										disableButtonWhileProcessing={disableButtonWhileProcessing}
										setDisableButton={setDisableButton}
										btnSize={'btn-lg-size'}
										btnIcon={true}
									/>
									<button
										className='btn btn-outline-secondary 
                btn-text-icon-secondary
                btn-lg-size'
										onClick={() => {
											token
												? addProductToWishlist({
														state,
														dispatch,
														setMessage,
														setDisableButton,
														product: productDetails,
														isRendered,
														token,
												  })
												: navigate('/login');
										}}>
										<i
											style={{ color: isAddedToWishlist ? '#ff3f6c' : '' }}
											className='btn-icon far fa-heart'></i>
										{isAddedToWishlist
											? 'Added in wishlist'
											: 'Add to Wishlist'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				'Loading...'
			)}
		</>
	);
};
