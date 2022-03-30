// Imports
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { listsDelete, listsUpdate } from '../../features/lists/listsSlice';

// Mui
import {
	Box,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Menu,
	MenuItem,
	OutlinedInput,
	Typography,
} from '@mui/material';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';

// interface
interface propsInterface {
	dnd?: any;
	title: string;
	listId: number;
	boardId: number;
}

// Styles
const headerStyles = {
	padding: 2,
	borderBottom: '1px solid black',
	cursor: 'move',
};

function ListHeader({ dnd, title, listId, boardId }: propsInterface) {
	// States
	const [formState, setFormState] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [listName, setListName] = useState<string>(title);

	// Variables
	const open = Boolean(anchorEl);
	const dispatch = useAppDispatch();

	// Functions
	function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setListName(value);
	}

	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

	function handleListNameChange(
		event:
			| React.FormEvent<HTMLFormElement>
			| React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
	) {
		event.preventDefault();

		if (title === listName || listName === '') {
			changeFormVisibility();
			return;
		}

		// TODO: Dispatch List Name Change
		dispatch(listsUpdate({ id: listId, title: listName }));
		changeFormVisibility();
	}

	function handleListDelete() {
		// TODO: Dispatch List add
		dispatch(listsDelete({ id: listId, boardId }));
		setAnchorEl(null);
	}

	return (
		<Box {...dnd} component="header" sx={headerStyles}>
			<Grid container alignItems="center">
				<Grid item xs={11}>
					{formState ? (
						<Box
							component="form"
							autoComplete="off"
							onSubmit={handleListNameChange}
						>
							<FormControl sx={{ width: '100%' }} variant="outlined">
								<InputLabel htmlFor="listName">List name</InputLabel>
								<OutlinedInput
									autoFocus
									fullWidth
									required
									id="listName"
									label="List name"
									value={listName}
									onChange={handleInputChange}
									onBlur={handleListNameChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												type="submit"
												aria-label="save list name"
												edge="end"
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
							component="h2"
							fontSize="1.25rem"
							onClick={changeFormVisibility}
						>
							{title}
						</Typography>
					)}
				</Grid>
				<Grid item xs={1}>
					<IconButton
						id="basic-button"
						aria-label="Open list menu"
						aria-haspopup="true"
						onClick={handleMenuOpen}
					>
						<MoreVertSharpIcon />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleListDelete}>Delete</MenuItem>
					</Menu>
				</Grid>
			</Grid>
		</Box>
	);
}

export default ListHeader;
