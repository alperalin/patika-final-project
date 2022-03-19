import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

// MUI
import { Grid, Typography, Button } from '@mui/material';

function App() {
	const [token, setToken, deleteToken] = useCookie('token', '');
	const navigate = useNavigate();

	useEffect(() => console.log(token), [token]);

	function handleButton(): void {
		console.log(token);
		deleteToken();
		navigate('/');
	}

	return (
		<Grid item xs={12} sx={{ padding: 2 }}>
			<Typography component="h1">Welcome to Kanban App</Typography>
			<Button onClick={handleButton}>Delete Cookie</Button>
		</Grid>
	);
}

export default App;
