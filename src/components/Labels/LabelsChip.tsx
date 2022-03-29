import { Chip } from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useAppSelector } from '../../hooks/hooks';
import { selectLabelsById } from '../../features/labels/labelsSlice';

// Interface
interface PropsInterface {
	labelId: number;
}

function LabelsChip({ labelId }: PropsInterface) {
	const { id, title, color } = useAppSelector((state) =>
		selectLabelsById(state, labelId)
	);

	return (
		<Chip
			icon={<LabelOutlinedIcon />}
			key={id}
			label={title}
			sx={{
				bgcolor: color,
				color: '#fff',
				'& .MuiChip-icon': { color: '#fff' },
				':first-of-type': {
					mr: 1,
				},
			}}
		/>
	);
}

export default LabelsChip;
