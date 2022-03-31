// Imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listsCreate } from '../../features/lists/listsSlice';
import { cardsCreate } from '../../features/cards/cardsSlice';

// Mui
import { Box, Button, TextField } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';

// Styles
const typeListStyles = {
	width: 300,
	flex: '300px 0 0',
	backgroundColor: '#dcefff',
	borderRadius: '5px',
	padding: 2,
	mr: 3,
	boxShadow: 3,
};

const addItemButtonStyles = {
	width: '100%',
	textTransform: 'none',
};

// Interface
interface PropsInterface {
	type: 'list' | 'card';
	parentId: number;
	order: number;
}

// Element
function AddItem({ type, parentId, order = 0 }: PropsInterface) {
	// States
	const [formState, setFormState] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	// Redux
	const dispatch = useDispatch();

	//Functions
	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value } = event.target;
		setInputValue(value);
	}

	function changeFormVisibility() {
		setFormState((prev) => !prev);
	}

	function handleAddItem(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (type === 'list') {
			dispatch(
				listsCreate({
					title: inputValue,
					order: Number(order),
					boardId: parentId,
				})
			);
		}

		if (type === 'card') {
			dispatch(
				cardsCreate({
					title: inputValue,
					order: Number(order),
					listId: parentId,
				})
			);
		}

		setInputValue('');
		changeFormVisibility();
	}

	// Return
	return (
		<Box sx={type === 'list' ? typeListStyles : {}}>
			{formState ? (
				<Box component="form" autoComplete="off" onSubmit={handleAddItem}>
					<TextField
						autoFocus
						fullWidth
						sx={{ mb: 2 }}
						name="inputValue"
						label={type === 'list' ? 'List Name' : 'Card Name'}
						placeholder={type === 'list' ? 'List Name' : 'Card Name'}
						onChange={handleInputChange}
						onBlur={changeFormVisibility}
						value={inputValue}
						required
					/>
					<Button
						type="submit"
						variant="contained"
						endIcon={<AddSharpIcon />}
						sx={addItemButtonStyles}
					>
						Add
					</Button>
				</Box>
			) : (
				<Button
					sx={addItemButtonStyles}
					variant="contained"
					endIcon={<AddSharpIcon />}
					onClick={changeFormVisibility}
				>
					{type === 'list' ? 'Add a list' : 'Add a card'}
				</Button>
			)}
		</Box>
	);
}

export default AddItem;
