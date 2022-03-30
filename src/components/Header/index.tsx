// Imports
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { clearUser } from '../../features/user/userSlice';

// Components
import Members from '../Members';
import MembersMenu from '../Members/MembersMenu';

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
	InputLabel,
	Typography,
} from '@mui/material';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';

// Interface
interface HeaderInterface {
	editable?: boolean;
	boardId?: number;
	title?: string;
	members?: number[];
	onTitleSave?: (title: string) => void;
}

// styles
const headerStyles = {
	backgroundColor: '#094C93',
	boxShadow:
		'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
	transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
};

const boardIconStyles = {
	color: '#fff',
	borderColor: '#fff',
	':hover': {
		borderColor: '#fff',
	},
};

const formStyles = {
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
};

const formControlStyles = {
	width: '100%',
	color: '#fff',
	'& :before': {
		borderColor: '#fff',
	},
	'& :after': {
		borderColor: '#fff',
	},
};

const inputStyles = {
	color: '#fff',
};

const logoutButtonStyles = {
	color: '#fff',
	borderColor: '#ffffff',
	ml: 2,
	':hover': {
		borderColor: '#fff',
	},
};

const editIconStyles = {
	color: '#fff',
	pl: 2,
};

function Header({
	editable = false,
	boardId,
	title = 'Kanban App',
	members,
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
			<Container maxWidth={false} sx={{ p: '0 8px !important' }}>
				<Grid container alignItems="center" spacing={2} width="100%" m={0}>
					<Grid item xs={5} p={2}>
						{isLoggedIn && boardId && (
							<Button
								component={RouterLink}
								to={'/boards'}
								variant="outlined"
								startIcon={<AssessmentSharpIcon />}
								sx={boardIconStyles}
							>
								Boards
							</Button>
						)}
					</Grid>
					<Grid
						item
						xs={2}
						display="flex"
						flexWrap="wrap"
						justifyContent="center"
						alignItems="center"
						p={2}
					>
						{isLoggedIn && formState ? (
							<Box
								component="form"
								autoComplete="off"
								onSubmit={handleBoardTitleChange}
								sx={formStyles}
							>
								<FormControl sx={formControlStyles} variant="outlined">
									<InputLabel htmlFor="boardName" sx={inputStyles}>
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
										sx={inputStyles}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													type="submit"
													aria-label="save list name"
													edge="end"
													sx={inputStyles}
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
								sx={editIconStyles}
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
						xs={5}
						p={2}
					>
						{isLoggedIn && (
							<>
								{members && members?.length > 0 && (
									<>
										<Typography
											sx={{
												display: 'flex',
												alignItems: 'center',
												color: '#fff',
												mr: 2,
											}}
										>
											<PeopleSharpIcon sx={{ mr: 1 }} /> Members
										</Typography>
										<Members maxAvatar={3} memberIds={members} />
									</>
								)}
								<MembersMenu boardId={Number(boardId)} />

								<Button
									variant="outlined"
									endIcon={<LogoutSharpIcon />}
									sx={logoutButtonStyles}
									onClick={handleLogout}
								>
									Logout
								</Button>
							</>
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Header;
