import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useStateContext } from '../../Context';
import { CheckoutAddress } from './CheckoutAddress';

export const Checkout = () => {
	const {
		state: {
			itemsInCart: { products },
		},
	} = useStateContext();

	const options = {
		'client-id': process.env.REACT_APP_CLIENT_ID,
		currency: 'INR',
	};

	return (
		<PayPalScriptProvider options={options}>
			<div className='width-800px'>
				<CheckoutAddress />
				<PayPalButtons style={{ layout: 'horizontal' }} />
			</div>
		</PayPalScriptProvider>
	);
};
