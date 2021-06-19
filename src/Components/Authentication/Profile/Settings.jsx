import { useAuthentication, useStateContext } from '../../../Context';

export const Settings = () => {
	const { logOutUser } = useAuthentication();
	const { dispatch } = useStateContext();
	return (
		<>
			<h2 className='profile-list-title'>Account Settings</h2>
			<div className='CTA-Container padding-around-1rem'>
				<button
					className='btn btn-solid-primary margin-0'
					onClick={() => logOutUser()}>
					Log out
				</button>
			</div>
		</>
	);
};
