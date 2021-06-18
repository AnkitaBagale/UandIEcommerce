import { useStateContext } from '../../Context';
import { CartItemCard } from './CartItemCard';
import { CartValue } from './CartValue';
import { SelectAddressModal } from './SelectAddressModal';
import { SelectAddress } from './SelectedAddress';

export const Cart = () => {
	const { state } = useStateContext();

	return (
		<>
			<h1 className='text-center h6 page-title'>My Cart</h1>

			{!state?.itemsInCart?.products?.length ? (
				<h3 className='text-center'>Cart is empty</h3>
			) : (
				<>
					<div className='display-flex width-800px'>
						<ul className='column-60-pc list-style-none styled-list padding-1rem-borderbox'>
							<SelectAddressModal>
								<SelectAddress />
							</SelectAddressModal>
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
						<CartValue />
					</div>
				</>
			)}
		</>
	);
};
