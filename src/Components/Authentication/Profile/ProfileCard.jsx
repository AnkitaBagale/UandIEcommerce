import { useAuthentication } from '../../../Context';
import avatarImg from './Images/user.svg';

export const ProfileCard = () => {
	const {
		state: { userDetails },
	} = useAuthentication();

	return (
		<>
			<h2 className='profile-list-title'>Profile Details</h2>
			<div className='card-horizontal margin-auto'>
				<div className='text-container'>
					<div className='row'>
						<div className='column-30-pc column1'>
							<span>Full Name</span>
						</div>
						<div className='column-70-pc'>
							<span>
								{userDetails?.firstname} {userDetails?.lastname}
							</span>
						</div>
					</div>

					<div className='row'>
						<div className='column-30-pc column1'>
							<span>Email ID</span>
						</div>
						<div className='column-70-pc'>
							<span>{userDetails?.email}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
