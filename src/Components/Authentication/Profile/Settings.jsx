import { useAuthentication, useStateContext } from '../../../Context';

export const Settings = () => {
	const { logOutUser } = useAuthentication();
	const { dispatch } = useStateContext();
	return (
		<div className='CTA-Container'>
			<button className='btn btn-solid-primary' onClick={() => logOutUser()}>
				Log out
			</button>
		</div>
	);
};
