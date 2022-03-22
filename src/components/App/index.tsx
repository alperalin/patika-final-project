import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

function App() {
	return (
		<Grid item xs={12} sx={{ padding: 2 }}>
			<Typography component="h1">Welcome to Kanban App</Typography>
		</Grid>
	);
}

export default App;
