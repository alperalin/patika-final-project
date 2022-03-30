// Component
import ChecklistsParent from './ChecklistsParent';

// Mui
import { Box, Typography } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

// Interface
interface PropsInterface {
	checklists: [];
}

function Checklists({ checklists }: PropsInterface) {
	return (
		<Box sx={{ mb: 8 }}>
			<Typography
				component="h3"
				variant="h5"
				sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2 }}
			>
				<CheckBoxOutlinedIcon sx={{ mr: 1 }} /> Checklists
			</Typography>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					mb: 2,
				}}
			>
				{checklists?.length > 0 &&
					checklists.map((checklistId) => (
						<ChecklistsParent key={checklistId} checklistId={checklistId} />
					))}
			</Box>
		</Box>
	);
}

export default Checklists;
