// Imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listsCreate } from '../../features/lists/listsSlice';

// Mui
import { Box, Button, TextField } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';

// Styles
const addListStyles = {
	width: 300,
	flex: '300px 0 0',
	backgroundColor: '#dcefff',
	borderRadius: '5px',
	padding: 2,
	mr: 3,
	boxShadow: 3,
};

const addListButtonStyles = {
	width: '100%',
	textTransform: 'none',
};

// Interface
interface AddListPropInterface {
	boardId: number;
	newListOrder: number;
}

// Element
function AddList({ boardId, newListOrder = 0 }: AddListPropInterface) {
	// States
	const [formState, setFormState] = useState<boolean>(false);
	const [listName, setListName] = useState<string>('');

	// Redux
	const dispatch = useDispatch();

	//Functions
	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setListName(value);
	}

	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

	function handleAddList(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// TODO: Dispatch List add
		dispatch(
			listsCreate({
				title: listName,
				order: Number(newListOrder),
				boardId: boardId,
			})
		);
		setListName('');
		changeFormVisibility();
	}

	// Return
	return (
		<Box sx={addListStyles}>
			{formState ? (
				<Box component="form" autoComplete="off" onSubmit={handleAddList}>
					<TextField
						autoFocus
						fullWidth
						sx={{ mb: 2 }}
						name="listName"
						label="List Name"
						placeholder="List Name"
						onChange={handleInputChange}
						onBlur={changeFormVisibility}
						value={listName}
						required
					/>
					<Button
						type="submit"
						variant="contained"
						endIcon={<AddSharpIcon />}
						sx={addListButtonStyles}
					>
						Add
					</Button>
				</Box>
			) : (
				<Button
					sx={addListButtonStyles}
					variant="contained"
					endIcon={<AddSharpIcon />}
					onClick={changeFormVisibility}
				>
					Add a list
				</Button>
			)}
		</Box>
	);
}

export default AddList;
