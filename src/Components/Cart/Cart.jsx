import { useState } from 'react';
import { useStateContext } from '../../Context';
import { CartItemCard } from './CartItemCard';
import { CartValue } from './CartValue';
import { OrderConfirmationPage } from './OrderConfirmationPage';

import { SelectAddressModal } from './SelectAddressModal';

export const Cart = () => {
	const { state } = useStateContext();
	const [status, setStatus] = useState('');
	const [orderId, setOrderId] = useState('');

	return (
		<>
			{status === 'SUCCESS' ? (
				<OrderConfirmationPage orderId={orderId} />
			) : (
				<>
					<h1 className='text-center h6 page-title'>My Cart</h1>
					{!state?.itemsInCart?.products?.length ? (
						<h3 className='text-center'>Cart is empty</h3>
					) : (
						<>
							<div className='display-flex width-800px'>
								<ul className='column-60-pc list-style-none styled-list padding-1rem-borderbox'>
									<SelectAddressModal />

									{state.itemsInCart.products.map(
										({ productId: product, quantity }) => {
											return (
												<li key={product._id}>
													<CartItemCard
														key={product._id}
														product={{ ...product, quantity }}
													/>
												</li>
											);
										},
									)}
								</ul>
								<div className='column-40-pc padding-1rem-borderbox border-width-2px-left display-flex-column'>
									<CartValue
										status={status}
										setStatus={setStatus}
										setOrderId={setOrderId}
									/>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};
