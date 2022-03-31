// Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { register, clearStatus } from '../../features/user/userSlice';
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
	Avatar,
	Alert,
	CircularProgress,
	Container,
} from '@mui/material';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';

// Interface
import { FormValuesInterface } from './types';

// LoginRegister Component
function Register() {
	// Local States
	const [cookie, setCookie] = useCookie('token', '');
	const [formValues, setFormValues] = useState<FormValuesInterface>({
		username: '',
		password: '',
		passwordConfirm: '',
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
	}, [navigate, apiStatus]);

	// Functions
	// handle Inputs
	function handleInput(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		apiMessage && dispatch(clearStatus());

		const { name, value } = event.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	// Handle Register
	function handleRegister(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		// Redux Register Dispatch
		if (apiStatus === 'idle') {
			dispatch(register({ ...formValues }));
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
							<AppRegistrationSharpIcon />
						</Avatar>
						<Typography
							component="h2"
							sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 3 }}
						>
							Register an account
						</Typography>

						{apiMessage && (
							<Alert severity="error" sx={{ mb: 3 }}>
								{apiMessage}
							</Alert>
						)}

						<Box component="form" autoComplete="off" onSubmit={handleRegister}>
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
							<TextField
								fullWidth
								sx={{ mb: 2 }}
								name="passwordConfirm"
								label="Password Confirm"
								type="password"
								placeholder="Password Confirm"
								autoComplete="off"
								onChange={handleInput}
								value={formValues['passwordConfirm']}
								required
							/>
							{apiStatus === 'loading' ? (
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<CircularProgress />
								</Box>
							) : (
								<Button type="submit" variant="contained" fullWidth>
									Register
								</Button>
							)}
						</Box>
					</Grid>
					<Grid item md></Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Register;
