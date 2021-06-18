import './styles.css';
import { useEffect } from 'react';
import { useStateContext, useAuthentication } from './Context';
import {
	getProductsFromServer,
	getWishlistFromServer,
	getCartFromServer,
	getUserAddressDetails,
} from './utils';
import { Routes, Route } from 'react-router-dom';

import {
	ProductListing,
	Cart,
	Wishlist,
	Nav,
	Home,
	Footer,
	ForgotPasswordPage,
	Login,
	PrivateRoute,
	Profile,
	SignUp,
	ProductDetailPage,
	ErrorPage,
	AddressList,
	Settings,
	ProfilePage,
	Checkout,
	SearchResultPage,
} from './Components';

export default function App() {
	const { dispatch } = useStateContext();
	const {
		state: { token, addressDetails },
		dispatch: authDispatch,
	} = useAuthentication();

	useEffect(() => {
		getProductsFromServer(dispatch);
	}, []);

	useEffect(() => {
		if (token) {
			getCartFromServer(dispatch, token);
			getWishlistFromServer(dispatch, token);
			getUserAddressDetails({ dispatch: authDispatch, token, addressDetails });
		}
	}, [token]);

	return (
		<div className='App'>
			<div className='App-container'>
				<Nav />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/shop' element={<ProductListing />} />
					<Route path='/shop/:id' element={<ProductDetailPage />} />
					<Route path='/search' element={<SearchResultPage />} />

					<PrivateRoute path='/wishlist' element={<Wishlist />} />
					<PrivateRoute path='/cart' element={<Cart />} />
					<PrivateRoute path='/checkout' element={<Checkout />} />
					<Route path='/login' element={<Login />} />
					<Route path='/forgot' element={<ForgotPasswordPage />} />
					<Route path='/signup' element={<SignUp />} />
					<PrivateRoute path='/profile' element={<ProfilePage />}>
						<PrivateRoute path='/' element={<Profile />} />
						<PrivateRoute path='/address' element={<AddressList />} />
						<PrivateRoute path='/settings' element={<Settings />} />
					</PrivateRoute>
					<Route path='*' element={<ErrorPage />} />
					<Route path='/error' element={<ErrorPage />} />
				</Routes>
				<div className='spacer-3rem'></div>
			</div>
			<Footer />
		</div>
	);
}
