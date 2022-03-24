import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verify } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import useCookie from '../../hooks/useCookie';

// API
import api from '../../api';
import { CircularProgress } from '@mui/material';

// interface
interface AuthInterface {
	children: JSX.Element;
}

function Auth({ children }: AuthInterface) {
	// Local States
	const [cookie, setCookie] = useCookie('token');

	// Redux
	const { isLoggedIn, apiStatus } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	// First init
	// Redux cookie bilmedigi icin once cookie Bearer olarak kayit ediliyor.
	// Daha sonra Redux user verify reducer'i dispatch ediliyor.
	// Eger cookie hala gecerli bir token ise kullanici otomatik uygulamaya yonlendiriliyor.
	useEffect(() => {
		if (apiStatus === 'idle' && cookie) {
			api.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
			dispatch(verify(cookie));
		}
	}, []);

	// State'teki isLoggedIn degeri false ise ziyaretciyi login sayfasina gonder
	if (apiStatus === 'loading') {
		<CircularProgress />;
	} else if (!isLoggedIn) {
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
