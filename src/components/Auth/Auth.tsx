import React from 'react';
import { Navigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

// interface
interface AuthInterface {
	children: JSX.Element;
}

function Auth({ children }: AuthInterface) {
	const [token, setToken] = useCookie('token', '');

	// Token yoksa kullaniciyi login sayfasina gonder
	if (!token) {
		// based on https://reactrouter.com/docs/en/v6/examples/auth
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" />;
	}

	return children;
}

export default Auth;
