// import
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
	checklistItemDelete,
	checklistItemUpdate,
	selectChecklistItemsById,
} from '../../features/checklistItems/checklistItemsSlice';

// Mui
import {
	Checkbox,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

// Interface
interface PropsInterface {
	checklistItemId: number;
}

function ChecklistsChild({ checklistItemId }: PropsInterface) {
	// Redux
	const { id, checklistId, title, isChecked } = useAppSelector((state) =>
		selectChecklistItemsById(state, checklistItemId)
	);
	const dispatch = useAppDispatch();

	// States
	const [checked, setChecked] = useState<boolean>(isChecked);

	// Function
	function handleToggle() {
		dispatch(checklistItemUpdate({ id, isChecked: !checked }));
		setChecked((prev) => !prev);
	}

	function handleChecklistItemDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();

		// Dispatch checklistItem delete
		dispatch(checklistItemDelete({ id, checklistId }));
	}

	// Element
	return (
		<ListItem
			key={id}
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="Delete checklist item"
					onClick={handleChecklistItemDelete}
				>
					<DeleteOutlineSharpIcon />
				</IconButton>
			}
			disablePadding
		>
			<ListItemButton role={undefined} onClick={handleToggle} dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={checked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-list-label-${id}` }}
					/>
				</ListItemIcon>
				<ListItemText id={`checkbox-list-label-${id}`} primary={title} />
			</ListItemButton>
		</ListItem>
	);
}

export default ChecklistsChild;
