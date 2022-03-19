import React from 'react';
import { Outlet } from 'react-router-dom';

// MUI
import { Container, Grid } from '@mui/material';

// Components
import Header from '../Header';

function Layout() {
	return (
		<>
			<Header />
			<Container component="main">
				<Grid container sx={{ mt: 5 }}>
					<Grid item md></Grid>
					<Outlet />
					<Grid item md></Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Layout;
