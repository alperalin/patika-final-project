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
	FormControl,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	InputBase,
	InputLabel,
	OutlinedInput,
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

// styles
const headerStyles = {
	backgroundColor: '#1976d2',
	boxShadow:
		'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
	transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
};

function Header({
	editable = false,
	title = 'Kanban App',
	onTitleSave,
}: HeaderInterface) {
	// Local State
	const [cookie, setCookie, deleteCookie] = useCookie('token', '');
	const [formState, setFormState] = useState<boolean>(false);
	const [boardName, setBoardName] = useState<string>(title);

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

	// handle title form visibility
	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

	// handle input change
	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setBoardName(value);
	}

	// Handle Title Save
	function handleBoardTitleChange(
		event:
			| React.FormEvent<HTMLFormElement>
			| React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
	) {
		event.preventDefault();

		if (title === boardName || boardName === '') {
			changeFormVisibility();
			return;
		}

		onTitleSave && onTitleSave(boardName);
		changeFormVisibility();
	}

	// Element
	return (
		<Box component="header" sx={headerStyles}>
			<Container maxWidth={false}>
				<Grid container alignItems="center" spacing={2} mt={0}>
					<Grid item xs={3} p={2}>
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
						xs={6}
						display="flex"
						flexWrap="wrap"
						justifyContent="center"
						alignItems="center"
						p={2}
					>
						{formState ? (
							<Box
								component="form"
								autoComplete="off"
								onSubmit={handleBoardTitleChange}
								sx={{
									color: '#fff',
									borderColor: '#fff',
									':focus': {
										color: '#fff',
										borderWidth: 1,
										borderColor: '#fff',
									},
									'& label.Mui-focused': {
										color: '#fff',
										borderWidth: 1,
										borderColor: '#fff',
									},
								}}
							>
								<FormControl
									sx={{
										width: '100%',
										color: '#fff',
										'& :before': {
											borderColor: '#fff',
										},
										'& :after': {
											borderColor: '#fff',
										},
									}}
									variant="outlined"
								>
									<InputLabel htmlFor="boardName" sx={{ color: '#fff' }}>
										Board name
									</InputLabel>
									<Input
										autoFocus
										fullWidth
										required
										id="boardName"
										value={boardName}
										onChange={handleInputChange}
										onBlur={handleBoardTitleChange}
										sx={{
											color: '#fff',
										}}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													type="submit"
													aria-label="save list name"
													edge="end"
													sx={{
														color: '#fff',
													}}
												>
													<SaveSharpIcon />
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Box>
						) : (
							<Typography
								variant="h1"
								component="h1"
								fontSize="1.5rem"
								color="#fff"
								onClick={changeFormVisibility}
							>
								{title}
							</Typography>
						)}

						{editable && !formState && (
							<IconButton
								aria-label="Change Board Title"
								sx={{
									color: '#fff',
									pl: 2,
								}}
								onClick={changeFormVisibility}
							>
								<EditSharpIcon />
							</IconButton>
						)}
					</Grid>
					<Grid
						item
						display="flex"
						flexWrap="wrap"
						justifyContent="flex-end"
						xs={3}
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
