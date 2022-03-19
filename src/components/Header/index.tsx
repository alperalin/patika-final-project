// Imports
import React from 'react';
// import { logoutTodos } from '../../features/todos/todosSlice';
// import { logoutCategories } from '../../features/categories/categoriesSlice';
// import { useAppDispatch } from '../../utils/hooks';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

// MUI
import { Box, Button, Grid, Typography } from '@mui/material';

function Header() {
	const [token, setToken, deleteToken] = useCookie('token', '');
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	// Handle Logout
	function handleLogout(): void {
		deleteToken();
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
					{/* <>
						{location.pathname !== '/' &&
							location.pathname !== '/categories' &&
							location.pathname !== '/login' && (
								<Button
									component={RouterLink}
									to={'/categories'}
									variant="outlined"
								>
									Kategoriler Sayfasina Don
								</Button>
							)}

						{location.pathname === '/categories' && (
							<Button component={RouterLink} to={'/'} variant="outlined">
								Todo Sayfasina Don
							</Button>
						)}
					</> */}
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
					{token && (
						<Button onClick={handleLogout} variant="contained">
							Logout
						</Button>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default Header;
