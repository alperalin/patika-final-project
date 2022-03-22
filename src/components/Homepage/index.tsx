import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

// MUI
import { Typography, Button, Grid } from '@mui/material';

function Homepage() {
	const { isLoggedIn, username } = useAppSelector((state) => state.user);

	return (
		<Grid item xs={12} sx={{ padding: 2, textAlign: 'center' }}>
			<Typography component="h1" sx={{ fontSize: '2rem', mb: 2 }}>
				Welcome{isLoggedIn ? `, ${username}` : ' to the kanban app'}
			</Typography>

			{isLoggedIn ? (
				<Button
					component={RouterLink}
					to={'/boards'}
					variant="outlined"
					sx={{ m: 2 }}
				>
					Go To Your Boards
				</Button>
			) : (
				<>
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
				</>
			)}
		</Grid>
	);
}

export default Homepage;
