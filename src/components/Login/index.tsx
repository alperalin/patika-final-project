// Imports
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { login, clearStatus } from '../../features/user/userSlice';
import useCookie from '../../hooks/useCookie';

// Component
import Header from '../Header';

// MUI
import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Link,
	Avatar,
	Alert,
	CircularProgress,
	Container,
} from '@mui/material';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';

// Interface
import { FormValuesInterface } from './types';

// LoginRegister Component
function Login() {
	// Local States
	const [cookie, setCookie] = useCookie('token', '');
	const [formValues, setFormValues] = useState<FormValuesInterface>({
		username: '',
		password: '',
	});

	// Redux
	const { token, apiStatus, apiMessage } = useAppSelector(
		(state) => state.user
	);
	const dispatch = useAppDispatch();

	// Router
	const navigate = useNavigate();

	// API Succeeded mesaji donerse cookie'ye state'den gelen token kayit ediliyor.
	// ve kullanici uygulamaya yonlendiriliyor.
	useEffect(() => {
		if (apiStatus === 'succeeded') {
			dispatch(clearStatus());
			setCookie(token);
			navigate('/boards');
		}
	}, [apiStatus]);

	// Functions
	// handle Inputs
	function handleInput(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		apiMessage && dispatch(clearStatus());

		const { name, value } = event.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	// Handle Login
	function handleLogin(event: React.FormEvent<HTMLFormElement>): void {
		// Form'un default aksiyonu engelleniyor.
		event.preventDefault();

		// Redux Login Dispatch
		if (apiStatus === 'idle') {
			dispatch(login({ ...formValues }));
		}
	}

	// Element
	return (
		<>
			<Header />
			<Container component="main" sx={{ mt: 5 }}>
				<Grid container>
					<Grid item md></Grid>
					<Grid item xs={12} md={4} sx={{ padding: 2 }}>
						<Avatar
							sx={{
								mr: 'auto',
								mb: 1,
								ml: 'auto',
								backgroundColor: 'secondary.main',
							}}
						>
							<LoginSharpIcon />
						</Avatar>
						<Typography
							component="h2"
							sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 3 }}
						>
							Login to your account
						</Typography>

						{apiMessage && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{apiMessage}
							</Alert>
						)}

						<Box component="form" autoComplete="off" onSubmit={handleLogin}>
							<TextField
								autoFocus
								fullWidth
								sx={{ mb: 2 }}
								name="username"
								label="Username"
								placeholder="Username"
								onChange={handleInput}
								value={formValues['username']}
								required
							/>
							<TextField
								fullWidth
								sx={{ mb: 2 }}
								name="password"
								label="Password"
								type="password"
								placeholder="Password"
								autoComplete="off"
								onChange={handleInput}
								value={formValues['password']}
								required
							/>
							{apiStatus === 'loading' ? (
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<CircularProgress />
								</Box>
							) : (
								<Button type="submit" variant="contained" fullWidth>
									Log in
								</Button>
							)}
							<Link
								component={RouterLink}
								to="/register"
								sx={{ display: 'block', textAlign: 'center', mt: 3 }}
							>
								Don't have an account? Register
							</Link>
						</Box>
					</Grid>
					<Grid item md></Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Login;
