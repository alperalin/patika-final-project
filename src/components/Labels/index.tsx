import { Box, Typography } from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LabelsChip from './LabelsChip';

// Interface
interface PropsInterface {
	cardId: number;
	cardLabels: number[];
}

function Labels({ cardId, cardLabels }: PropsInterface) {
	return (
		<Box sx={{ mb: 5 }}>
			<Typography
				component="h3"
				variant="h5"
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					mb: 1,
				}}
			>
				<LabelOutlinedIcon sx={{ mr: 1 }} /> Labels
			</Typography>
			{cardLabels?.length > 0 &&
				cardLabels.map((labelId: number) => (
					<LabelsChip key={labelId} labelId={labelId} />
				))}
		</Box>
	);
}

export default Labels;
