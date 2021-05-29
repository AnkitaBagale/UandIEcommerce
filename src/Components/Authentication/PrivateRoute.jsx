import { Navigate, Route } from 'react-router-dom';
import { useAuthentication } from '../../Context';

export const PrivateRoute = ({ path, ...props }) => {
	const {
		state: { token },
	} = useAuthentication();

	return token ? (
		<Route {...props} path={path} />
	) : (
		<Navigate state={{ from: path }} replace to='/login' />
	);
};
