import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import { selectLabelsById } from '../../features/labels/labelsSlice';

// Interface
interface PropsInterface {
	labelId: number;
}

function LabelsBox({ labelId }: PropsInterface) {
	const { id, title, color } = useAppSelector((state) =>
		selectLabelsById(state, labelId)
	);

	return (
		<Box
			key={id}
			sx={{
				bgcolor: color,
				width: 16,
				height: 16,
				borderRadius: '50%',
				mr: 1,
			}}
		></Box>
	);
}

export default LabelsBox;
