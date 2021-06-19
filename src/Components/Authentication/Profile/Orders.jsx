import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication, useStateContext } from '../../../Context';
import { getOrdersFromServer, INDIAN_RUPEE } from '../../../utils';

export const Orders = () => {
	const {
		state: { orders },
		dispatch,
	} = useStateContext();
	const {
		state: { token },
	} = useAuthentication();
	useEffect(() => {
		getOrdersFromServer({ token, dispatch });
	}, []);

	return (
		<>
			<h2 className='profile-list-title'>My Orders</h2>

			{orders.length !== 0 &&
				orders.map((order) => <OrderCard order={order} />)}
		</>
	);
};

const OrderCard = ({ order }) => {
	const [showPaymentDetails, setPaymentDetails] = useState(false);

	return (
		<>
			<div className='padding-around-1rem shadow-box order-card margin-bottom-1rem'>
				<h6 className='body-cp-rg text-green'>
					Order Confirmed
					<br />
					<span className='body-cp-md secondary-text-color text-light-weight'>
						{new Date(order.createdAt).toDateString()}
					</span>
				</h6>
				<p className='body-cp-md'>Order# {order._id}</p>
				<p className='body-cp-md'>
					Total: {INDIAN_RUPEE}
					{order.payment.totalPaid}{' '}
					<button
						onClick={() => setPaymentDetails(true)}
						className='link-no-style'>
						View Breakup
					</button>
				</p>

				<p className='body-cp-md'>
					Deliver to:{' '}
					<span>
						{`${order.addressId.name}, ${order.addressId.streetAddress}, ${order.addressId.city}, ${order.addressId.zipCode}`}
					</span>
				</p>

				{order.items.map((item) => (
					<OrderItem item={item} />
				))}
			</div>

			{showPaymentDetails && (
				<PaymentDetailsModal
					setPaymentDetails={setPaymentDetails}
					payment={order.payment}
					items={order.items}
				/>
			)}
		</>
	);
};

const OrderItem = ({ item: { productId: product, quantity } }) => {
	return (
		<div
			to={`/shop/${product._id}`}
			className='card-horizontal border-width-1px default-container margin-bottom-1rem'>
			<div className='image-container'>
				<Link to={`/shop/${product._id}`} className='link-no-style'>
					<img
						className='img-responsive card-img'
						src={product.image}
						alt={product.name}
					/>
				</Link>
			</div>
			<div className='text-container'>
				<Link to={`/shop/${product._id}`} className='link-no-style'>
					<div className='text-container-title'>
						<h6 className='body-cp-rg text-regular-weight'>{product.name}</h6>
						<p className='body-cp-md'>{product.brand}</p>
						<p className='body-cp-md'>qty: {quantity}</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

const PaymentDetailsModal = ({ setPaymentDetails, payment, items }) => {
	return (
		<div className={'modal-interstitial active'}>
			<div className='modal-content'>
				<div className='margin-auto'>
					<button
						onClick={() => setPaymentDetails(false)}
						type='button'
						className='btn-close modal-close'></button>
					<div className='text-container'>
						<h4 className='h6'>Payment Details</h4>
					</div>
					<div className='padding-around-1rem'>
						{items.map((item) => (
							<div className='row body-cp-md'>
								<div className='column-80-pc secondary-text-color text-light-weight'>
									{item?.quantity} x {item?.productId?.name}
								</div>
								<div className='column-20-pc text-right'>
									{INDIAN_RUPEE}
									{item?.quantity * item?.payment?.amount}
								</div>
							</div>
						))}
						<div className='filter-divider-line'></div>
						{payment?.discount && (
							<>
								<div className='row body-cp-md '>
									<div className='column-80-pc secondary-text-color text-light-weight'>
										Discount on MRP
									</div>
									<div className='column-20-pc text-right text-green'>
										-{INDIAN_RUPEE}
										{payment?.discount}
									</div>
								</div>
								<div className='filter-divider-line'></div>
							</>
						)}
						{payment?.couponDiscount !== 0 && (
							<>
								<div className='row body-cp-md '>
									<div className='column-80-pc secondary-text-color text-light-weight'>
										Coupon Discount
									</div>
									<div className='column-20-pc text-right text-green'>
										-{INDIAN_RUPEE}
										{payment?.couponDiscount}
									</div>
								</div>
								<div className='filter-divider-line'></div>
							</>
						)}

						<div className='row text-regular-weight body-cp-rg'>
							<div className='column-80-pc'>Total Paid</div>
							<div className='column-20-pc  text-right'>
								{INDIAN_RUPEE}
								{payment?.totalPaid}
							</div>
						</div>

						<div className='filter-divider-line'></div>
					</div>
				</div>
			</div>
		</div>
	);
};
