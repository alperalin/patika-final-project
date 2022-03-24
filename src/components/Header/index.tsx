// Imports
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { clearUser } from '../../features/user/userSlice';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

// MUI
import { Box, Button, Grid, Typography } from '@mui/material';

function Header() {
	// Local State
	const [cookie, setCookie, deleteCookie] = useCookie('token', '');

	// Redux
	const { isLoggedIn } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	// Router
	const navigate = useNavigate();

	// Handle Logout
	function handleLogout(): void {
		dispatch(clearUser());
		deleteCookie();
		navigate('/');
	}

	// Element
	return (
		<Box
			component="header"
			sx={{
				borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
				padding: 3,
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={2}>
					{isLoggedIn && (
						<Button component={RouterLink} to={'/boards'} variant="outlined">
							Boards
						</Button>
					)}
				</Grid>
				<Grid item xs={8}>
					<Typography component="h1" fontSize="1.5rem" textAlign="center" m={0}>
						Kanban App
					</Typography>
				</Grid>
				<Grid
					item
					xs={2}
					sx={{
						textAlign: 'right',
					}}
				>
					{isLoggedIn && (
						<Button onClick={handleLogout} variant="outlined">
							Logout
						</Button>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default Header;
