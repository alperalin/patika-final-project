// Imports
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

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
} from '@mui/material';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';

// API
import { service } from '../../api/service';

// Interface
import { FormValuesInterface } from './types';

// LoginRegister Component
function Login() {
	// States
	const [token, setToken] = useCookie('token', '');
	const [formValues, setFormValues] = useState<FormValuesInterface>({
		username: '',
		password: '',
	});
	const [alertText, setAlertText] = useState<string>('');

	// variables
	const navigate = useNavigate();

	// Functions
	// handle Inputs
	function handleInput(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
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

		// Input degerleri aliniyor
		const { username, password } = event.currentTarget;

		// // API call
		service
			.post('/auth/login', {
				username: username.value,
				password: password.value,
			})
			.then((response) => {
				if (response.status === 200) {
					// Diger api cagrilarinda kullanilmasi icin
					// sunucunun dondugu token degeri
					// axios'un defaults degerlerine ekleniyor.
					const token: string = response.data.token;
					// service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					setToken(token, 2);
					// Token cookie'ye kayit ediliyor.
					// document.cookie = `token=${token}`;

					// Alert mesaji siliniyor
					setAlertText('');

					// redirect to boards page
					navigate('/boards');
				}
			})
			.catch((error) => {
				setAlertText(error.response.data);
			});
	}

	// Element
	return (
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

			{alertText && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{alertText}
				</Alert>
			)}

			<Box component="form" autoComplete="off" onSubmit={handleLogin}>
				<TextField
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
				<Button type="submit" variant="contained" fullWidth>
					Log in
				</Button>
				<Link
					component={RouterLink}
					to="/register"
					sx={{ display: 'block', textAlign: 'center', mt: 3 }}
				>
					Don't have an account? Register
				</Link>
			</Box>
		</Grid>
	);
}

export default Login;
