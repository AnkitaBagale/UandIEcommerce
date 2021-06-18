import { AddressCard } from './AddressCard';
import React, { useState } from 'react';

import { AddressEditor } from './AddressEditor';
import { useAuthentication } from '../../../../Context';

export const AddressList = () => {
	const [isAddNew, setAddNew] = useState(false);
	const {
		state: { addressDetails },
	} = useAuthentication();

	return (
		<>
			<h2 className='body-cp-rg address-list-title'>My Addresses</h2>
			<ul className='list-style-none styled-list'>
				{addressDetails &&
					addressDetails.map((address) => (
						<AddressCard key={address._id} address={address} />
					))}
			</ul>

			<button
				className='btn btn-text-icon-secondary'
				onClick={() => {
					setAddNew(true);
					document.body.style.overflow = 'hidden';
				}}>
				<span className='btn-icon'>
					<i className='fas fa-plus'></i>
				</span>
				ADD NEW ADDRESS
			</button>

			{isAddNew && <AddressEditor setAddNew={setAddNew} isAddNew={isAddNew} />}
		</>
	);
};
