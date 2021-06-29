import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuthentication, useStateContext } from '../../Context';

import './nav.css';
import { SearchBar } from './SearchBar';

export const Nav = () => {
	const { state } = useStateContext();
	const navRef = useRef(null);
	const {
		state: { token, userName },
	} = useAuthentication();

	const navItems = [
		{ text: 'Home', link: '/', hideInDesktop: false },
		{ text: 'Shop Now', link: '/shop', hideInDesktop: false },
		{ text: 'Profile', link: '/profile', hideInDesktop: true },
		{ text: 'Orders', link: '/profile/orders', hideInDesktop: true },
		{ text: 'Addresses', link: '/profile/address', hideInDesktop: true },
		{ text: 'Settings', link: '/profile/settings', hideInDesktop: true },
	];

	return (
		<nav ref={navRef} className='nav-bar shadow-box'>
			<div className='nav-section'>
				<div
					className='burger nav-section-items'
					onClick={() => {
						navRef.current.classList.toggle('active');
					}}>
					<div className='line1'></div>
					<div className='line2'></div>
					<div className='line3'></div>
				</div>

				<div className='nav-logo nav-section-items'>
					<Link to='/' className='link-no-style text-left'>
						<span className='primary-text-color logo-title'>
							U
							<span className='tertiary-text-color logo-and-symbol-style'>
								&
							</span>
							I
						</span>

						<span className='tertiary-text-color logo-tagline'>
							LET'S DESIGN TOGETHER
						</span>
					</Link>
				</div>

				<div className='nav-logo-title'>
					<Link to='/' className='link-no-style' href='/index.html'>
						<span className='primary-text-color logo-title'>
							U
							<span className='tertiary-text-color logo-and-symbol-style'>
								&
							</span>
							I
						</span>
					</Link>
				</div>

				<ul className='nav-bar-links list-style-none nav-section-items'>
					<li className='list-inline-item avatar-in-nav-links'>
						<Link
							to='/profile'
							className='nav-icon-link link-no-style avatar avatar-sm-size text-center'>
							<span className='nav-icon'>
								<i className='fas fa-user'></i>
							</span>
						</Link>
					</li>

					{navItems.map(({ text, link, hideInDesktop }) => (
						<li
							key={text}
							className={`list-inline-item ${
								hideInDesktop ? 'hide-in-desktop' : ''
							}`}>
							<NavLink
								end
								to={link}
								activeClassName='navlinks-active'
								className='navlinks-style text-left'>
								{text}
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			<div className='nav-section'>
				<SearchBar />
				<ul className='nav-icons list-style-none nav-section-item-width50pc'>
					<li className='list-inline-item hide-profile-mobile'>
						<Link to='/profile' className='nav-icon-link link-no-style'>
							<span className='nav-icon'>
								<i className='fas fa-user'></i>
							</span>
							<span className='nav-icon-text'>
								{userName ? `Hi, ${userName}` : 'Login'}
							</span>
						</Link>
					</li>

					<li className='list-inline-item display-flex vertical-middle'>
						<Link
							to='/wishlist'
							className='nav-icon-link link-no-style text-regular-weight'>
							<span className='nav-icon badge-container'>
								<i className='fas fa-heart'></i>
								<span
									className='status-badge status-badge-number'
									style={{ display: token ? 'flex' : 'none' }}>
									{state?.itemsInWishlist?.length}
								</span>
							</span>
							<span className='nav-icon-text'>Wishlist</span>
						</Link>
					</li>

					<li className='list-inline-item display-flex vertical-middle'>
						<Link
							to='/cart'
							className='nav-icon-link link-no-style text-regular-weight '>
							<span className='nav-icon  badge-container'>
								<i className='fas fa-shopping-cart'></i>
								<span
									className='status-badge status-badge-number'
									style={{ display: token ? 'flex' : 'none' }}>
									{state?.itemsInCart?.products?.length || '0'}
								</span>
							</span>
							<span className='nav-icon-text'>Cart</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
