import { AddressCard } from './AddressCard';
import React, { useEffect, useState } from 'react';

import { AddressEditor } from './AddressEditor';
import { useAuthentication } from '../../../../Context';
import axios from 'axios';
import { API_URL } from '../../../../utils';

export const AddressList = () => {
	const [isAddNew, setAddNew] = useState(false);
	const {
		state: { addressDetails, token },
		dispatch,
	} = useAuthentication();

	useEffect(() => {
		(async () => {
			try {
				if (!addressDetails && token) {
					const {
						data: { response },
					} = await axios.get(`${API_URL}/addresses`, {
						headers: { Authorization: token },
					});

					dispatch({
						type: 'SET_ADDRESS_DETAILS',
						payload: { addressDetails: response },
					});
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

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
