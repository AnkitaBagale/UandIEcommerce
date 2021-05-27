import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthentication, useStateContext } from '../../Context';
import { API_URL } from '../../utils';
import { AddressCard } from '../Authentication/Profile/AddressManagement/AddressCard';
import { AddressEditor } from '../Authentication/Profile/AddressManagement/AddressEditor';
import '../Authentication/Profile/profile.css';
export const SelectAddress = () => {
	const { dispatch } = useStateContext();
	const {
		state: { token, addressDetails },
		dispatch: authDispatch,
	} = useAuthentication();
	const {
		state: {
			itemsInCart: { addressId },
		},
	} = useStateContext();

	const [showModal, setShowModal] = useState(false);
	const [isAddNew, setAddNew] = useState(false);
	const selectedAddress = addressDetails?.find(
		(address) => address._id === addressId,
	);

	const changeAddress = async (addressId) => {
		try {
			setShowModal(false);
			const {
				data: { response },
				status,
			} = await axios({
				method: 'POST',
				url: `${API_URL}/cart/address`,
				data: { _id: addressId },
				headers: {
					Authorization: token,
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
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				if (!addressDetails) {
					const {
						data: { response },
					} = await axios({
						method: 'GET',
						url: `${API_URL}/addresses`,
						headers: {
							Authorization: token,
						},
					});

					authDispatch({
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
			<div className='margin-bottom-8px'>
				<div className='card-horizontal border-width-1px'>
					<div className='text-container display-flex-row'>
						{selectedAddress ? (
							<div>
								<div className='body-cp-md'>
									Deliver to:{' '}
									<span className='text-regular-weight'>
										{`${selectedAddress.name}, ${selectedAddress.zipCode}`}
									</span>
								</div>
								<div className='body-cp-sm margin-top-8px'>
									{`${selectedAddress.streetAddress}, ${selectedAddress.city}`}
								</div>
							</div>
						) : (
							<div className='body-cp-md'>
								Deliver to:
								<div className='body-cp-md'>Address not selected</div>
							</div>
						)}
						<button
							className='btn btn-sm-size btn-outline-primary margin-0'
							onClick={() => setShowModal(true)}>
							Change
						</button>
					</div>
				</div>
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
			</div>
			{isAddNew && <AddressEditor setAddNew={setAddNew} isAddNew={isAddNew} />}
		</>
	);
};
