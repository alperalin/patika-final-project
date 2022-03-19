import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Mui
import { Typography, Button, Grid } from '@mui/material';

function Homepage() {
	return (
		<Grid item xs={12} sx={{ padding: 2, textAlign: 'center' }}>
			<Typography component="h1" sx={{ fontSize: '2rem', mb: 2 }}>
				Welcome to Kanban App
			</Typography>
			<Button
				component={RouterLink}
				to={'/login'}
				variant="contained"
				sx={{ m: 2 }}
			>
				Login
			</Button>
			<Button
				component={RouterLink}
				to={'/register'}
				variant="contained"
				sx={{ m: 2 }}
			>
				Register
			</Button>
		</Grid>
	);
}

export default Homepage;
