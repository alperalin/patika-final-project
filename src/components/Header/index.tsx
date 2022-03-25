// Imports
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { clearUser } from '../../features/user/userSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

// MUI
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	InputBase,
	Typography,
} from '@mui/material';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';

// Interface
interface HeaderInterface {
	editable?: boolean;
	title?: string;
	onTitleSave?: (title: string) => void;
}

function Header({
	editable = false,
	title = 'Kanban App',
	onTitleSave,
}: HeaderInterface) {
	// Local State
	const [cookie, setCookie, deleteCookie] = useCookie('token', '');
	const [inputValue, setInputValue] = useState<string>(title);
	const [editingState, setEditingState] = useState<boolean>(false);

	// Redux
	const { isLoggedIn } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	// Router
	const navigate = useNavigate();

	// Functions
	// Handle Logout
	function handleLogout(): void {
		dispatch(clearUser());
		deleteCookie();
		navigate('/');
	}

	// Handle Title Save
	function handleTitleSave() {
		setEditingState(false);
		onTitleSave && onTitleSave(inputValue);
	}

	// Element
	return (
		<Box
			component="header"
			sx={{
				backgroundColor: '#1976d2',
				boxShadow:
					'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
				transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
			}}
		>
			<Container>
				<Grid container alignItems="center" spacing={2} mt={0}>
					<Grid item md={3} p={2}>
						{isLoggedIn && (
							<Button
								component={RouterLink}
								to={'/boards'}
								variant="outlined"
								startIcon={<AssessmentSharpIcon />}
								sx={{
									color: '#fff',
									borderColor: '#fff',
									':hover': {
										borderColor: '#fff',
									},
								}}
							>
								Boards
							</Button>
						)}
					</Grid>
					<Grid
						item
						md={6}
						display="flex"
						flexWrap="wrap"
						justifyContent="center"
						alignItems="center"
						p={2}
					>
						{editingState ? (
							<InputBase
								autoFocus
								sx={{
									maxWidth: 250,
									width: '100%',
									color: '#fff',
									borderBottom: '1px solid #fff',
								}}
								name="boardTitle"
								onChange={(e) => setInputValue(e.currentTarget.value)}
								value={inputValue}
								required
							/>
						) : (
							<Typography
								variant="h1"
								component="h1"
								fontSize="1.5rem"
								color="#fff"
							>
								{title}
							</Typography>
						)}

						{editable && !editingState && (
							<IconButton
								aria-label="Change Board Title"
								sx={{
									color: '#fff',
									pl: 2,
								}}
								onClick={() => setEditingState(true)}
							>
								<EditSharpIcon />
							</IconButton>
						)}

						{editable && editingState && (
							<IconButton
								aria-label="Save Board Title"
								sx={{
									color: '#fff',
									pl: 2,
								}}
								onClick={handleTitleSave}
							>
								<SaveSharpIcon />
							</IconButton>
						)}
					</Grid>
					<Grid
						item
						display="flex"
						flexWrap="wrap"
						justifyContent="flex-end"
						md={3}
						p={2}
					>
						{isLoggedIn && (
							<Button
								variant="outlined"
								endIcon={<LogoutSharpIcon />}
								sx={{
									color: '#fff',
									borderColor: '#ffffff',
									':hover': {
										borderColor: '#fff',
									},
								}}
								onClick={handleLogout}
							>
								Logout
							</Button>
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Header;
