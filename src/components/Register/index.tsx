// Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI
import {
	Box,
	Grid,
	Typography,
	TextField,
	Button,
	Avatar,
	Alert,
} from '@mui/material';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';

// API
import { service } from '../../api/service';

// Interface
import { FormValuesInterface } from './types';

// LoginRegister Component
function Register() {
	// States
	const [formValues, setFormValues] = useState<FormValuesInterface>({
		username: '',
		password: '',
		passwordConfirm: '',
	});
	const [alertText, setAlertText] = useState<string>('');

	// variables
	const navigate = useNavigate();

	// Functions
	// handle Inputs
	function handleInput(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { name, value } = event.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	// Handle Register
	function handleRegister(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		// API call
		// Input degerleri aliniyor
		const { username, password, passwordConfirm } = event.currentTarget;

		// API call
		service
			.post('/auth/register', {
				username: username.value,
				password: password.value,
				passwordConfirm: passwordConfirm.value,
			})
			.then((response) => {
				if (response.status === 200) {
					// Diger api cagrilarinda kullanilmasi icin
					// sunucunun dondugu token degeri
					// axios'un defaults degerlerine ekleniyor.
					const token: string = response.data.token;
					service.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					// Token cookie'ye kayit ediliyor.
					document.cookie = `token=${token}`;

					// Alert mesaji siliniyor
					setAlertText('');

					// redirect to app
					navigate('/boards', { replace: true });
				}
			})
			.catch((error) => {
				setAlertText(error.response.data['issues'][0].message);
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
				<AppRegistrationSharpIcon />
			</Avatar>
			<Typography
				component="h2"
				sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 3 }}
			>
				Register an account
			</Typography>

			{alertText && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{alertText}
				</Alert>
			)}

			<Box component="form" autoComplete="off" onSubmit={handleRegister}>
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
				<Button type="submit" variant="contained" fullWidth>
					Register
				</Button>
			</Box>
		</Grid>
	);
}

export default Register;
