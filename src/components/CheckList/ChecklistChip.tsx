import { useAppSelector } from '../../hooks/hooks';
import {
	selectItemsByChecklistId,
	selectCheckedItemsByChecklistId,
} from '../../features/checklistItems/checklistItemsSlice';

// Mui
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// interface
interface PropsInterface {
	checklistId: number;
}

function ChecklistChip({ checklistId }: PropsInterface) {
	const checkedItems = useAppSelector((state) =>
		selectCheckedItemsByChecklistId(state, checklistId)
	);
	const checklistItems = useAppSelector((state) =>
		selectItemsByChecklistId(state, checklistId)
	);

	const label = `${checkedItems?.length || 0}/${checklistItems?.length}`;

	return (
		<Chip
			icon={<CheckCircleOutlineIcon />}
			label={label}
			color="secondary"
			sx={{ mr: 1, mb: 1 }}
		/>
	);
}

export default ChecklistChip;
