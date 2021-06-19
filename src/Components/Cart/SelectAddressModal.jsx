import axios from 'axios';
import { cloneElement, useState } from 'react';
import { useAuthentication, useStateContext } from '../../Context';
import { API_URL } from '../../utils';
import { AddressCard } from '../Authentication/Profile/AddressManagement/AddressCard';
import { AddressEditor } from '../Authentication/Profile/AddressManagement/AddressEditor';
import '../Authentication/Profile/styles.css';
import { SelectAddress } from './SelectedAddress';
import { useSelectedAddress } from './utils';
export const SelectAddressModal = () => {
	const { dispatch } = useStateContext();
	const {
		state: { token, addressDetails },
	} = useAuthentication();

	const [showModal, setShowModal] = useState(false);
	const [isAddNew, setAddNew] = useState(false);

	const { selectedAddress } = useSelectedAddress();

	const changeAddress = async (addressId) => {
		try {
			const {
				data: { response },
				status,
			} = await axios({
				method: 'POST',
				url: `${API_URL}/cart/address`,
				data: { _id: addressId },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (status === 200) {
				dispatch({
					type: 'SET_CART',
					payload: response,
				});
			} else {
				throw new Error('Request failed');
			}
			setShowModal(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<SelectAddress setShowModal={setShowModal} />
			{showModal && (
				<div className='modal-interstitial active'>
					<div className='modal-content vertical-middle'>
						<button
							type='button'
							className='btn-close modal-close'
							onClick={() => setShowModal(false)}></button>
						<div className='list-style-none styled-list'>
							{addressDetails?.map((address) => (
								<div key={address._id} className='display-flex'>
									<input
										className='form-checkbox-field select-address-radio'
										type='radio'
										name='address'
										checked={address._id === selectedAddress?._id}
										onChange={() => changeAddress(address._id)}
									/>
									<span className='address-list-item'>
										<AddressCard address={address} />
									</span>
								</div>
							))}
						</div>
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
					</div>
				</div>
			)}

			{isAddNew && <AddressEditor setAddNew={setAddNew} isAddNew={isAddNew} />}
		</>
	);
};
