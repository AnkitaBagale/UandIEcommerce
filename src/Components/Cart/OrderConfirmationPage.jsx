import { Link } from 'react-router-dom';

export const OrderConfirmationPage = ({ orderId }) => {
	return (
		<div className='vertical-middle display-flex display-flex-column page-title'>
			<h4 className='text-green'>Order Confirmed</h4>
			<p className='text-regular-weight'>Order No. {orderId}</p>
			<p>Thank you for shopping with us!</p>
			<Link to='/profile/orders' className='btn btn-solid-primary'>
				View Order
			</Link>
		</div>
	);
};
