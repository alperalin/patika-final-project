import { LinearProgress, Typography, Box } from '@mui/material';

// interface
interface PropsInterface {
	checkedItemsTotal: number;
	checklistTotal: number;
}

// Element
function ChecklistProgress({
	checkedItemsTotal,
	checklistTotal,
}: PropsInterface) {
	const ratio = checklistTotal ? Math.round(100 / checklistTotal) : 0;
	const progress =
		checkedItemsTotal < checklistTotal ? checkedItemsTotal * ratio : 100;

	return (
		<Box sx={{ width: '100%', pt: 2, pb: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress variant="determinate" value={progress} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography
						variant="body2"
						color="text.secondary"
					>{`${checkedItemsTotal}/${checklistTotal}`}</Typography>
				</Box>
			</Box>
		</Box>
	);
}

export default ChecklistProgress;
