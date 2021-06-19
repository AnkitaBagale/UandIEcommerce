import { NavLink, Outlet } from 'react-router-dom';

import './profile.css';
export const ProfilePage = () => {
	const items = [
		{
			text: 'Profile',
			link: '/profile',
		},
		{
			text: 'Orders',
			link: '/profile/orders',
		},
		{
			text: 'Addresses',
			link: '/profile/address',
		},
		{
			text: 'Settings',
			link: '/profile/settings',
		},
	];
	return (
		<div className='user-profile-container padding-around-1rem'>
			<h1 className='h4 text-center padding-bottom-1rem'>Account</h1>
			<div className='filter-divider-line'></div>
			<div className='display-flex'>
				<div className='column-20-pc column1 border-right-2px '>
					<ul className='styled-list list-style-none margin-1rem'>
						{items.map(({ text, link }) => (
							<li key={text}>
								<NavLink
									to={link}
									end
									activeClassName='text-green text-regular-weight'
									className='link-no-style'>
									{text}
								</NavLink>
							</li>
						))}
					</ul>
				</div>

				<div className='column-80-pc'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
