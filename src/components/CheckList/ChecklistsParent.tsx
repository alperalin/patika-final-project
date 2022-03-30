// import
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
	checklistsDelete,
	selectChecklistsById,
} from '../../features/checklists/checklistsSlice';
import {
	checklistItemCreate,
	selectCheckedItemsByChecklistId,
} from '../../features/checklistItems/checklistItemsSlice';

// Mui
import {
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import ChecklistsChild from './ChecklistsChild';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ChecklistProgress from './ChecklistsProgress';

// Interface
interface PropsInterface {
	checklistId: number;
}

function ChecklistsParent({ checklistId }: PropsInterface) {
	// State
	const [newChecklistItem, setNewChecklistItem] = useState<string>('');

	// Redux
	const { id, cardId, title, items } = useAppSelector((state) =>
		selectChecklistsById(state, checklistId)
	);
	const checkedItems = useAppSelector((state) =>
		selectCheckedItemsByChecklistId(state, checklistId)
	);
	const dispatch = useAppDispatch();

	// Function
	function handleChecklistDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();

		// Dispatch checklist delete action
		dispatch(checklistsDelete({ id, cardId }));
	}

	// Functions
	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		const { value } = event.target;

		setNewChecklistItem(value);
	}

	function handleChecklistItemSubmit(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault();
		event.stopPropagation();

		if (!newChecklistItem) return;

		dispatch(
			checklistItemCreate({
				title: newChecklistItem,
				checklistId: id,
				isChecked: false,
			})
		);

		setNewChecklistItem('');
	}

	// Element
	return (
		<>
			<Grid container alignItems="center">
				<Grid item xs={11}>
					<Typography component="h4" variant="h6">
						{title}
					</Typography>
				</Grid>
				<Grid item xs={1} textAlign="right">
					<IconButton onClick={handleChecklistDelete}>
						<DeleteOutlineSharpIcon />
					</IconButton>
				</Grid>
			</Grid>

			<ChecklistProgress
				checkedItemsTotal={checkedItems?.length ? checkedItems.length : 0}
				checklistTotal={items?.length ? items.length : 0}
			/>

			<Grid container alignItems="center">
				<Grid item xs={12} sx={{ pl: 1, pr: 1 }}>
					<List sx={{ width: '100%', p: 0 }}>
						{items?.length > 0 &&
							items.map((itemId: number) => (
								<ChecklistsChild key={itemId} checklistItemId={itemId} />
							))}

						<ListItem
							key={id}
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="Add checklist item"
									onClick={handleChecklistItemSubmit}
								>
									<AddOutlinedIcon />
								</IconButton>
							}
							sx={{ pt: 0, pb: 0, pl: 8, pr: 7 }}
						>
							<ListItemText>
								<TextField
									fullWidth
									name="newChecklistItem"
									label="Checklist item"
									placeholder="Checklist item"
									onChange={handleInputChange}
									value={newChecklistItem}
									required
								/>
							</ListItemText>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</>
	);
}

export default ChecklistsParent;
