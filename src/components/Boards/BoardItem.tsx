// imports
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { boardsDelete } from '../../features/boards/boardsSlice';

// Mui
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import Members from '../Members';

// Interface
interface AppPropInterface {
	board: any;
}

// Styles
const cardStyles = {
	width: '100%',
	minHeight: 216,
	height: '100%',
};

const cardHeaderStyles = { height: '50px', padding: 1 };

const cardMainStyles = { width: '100%', textAlign: 'center' };

const cardFooterStyles = { fontSize: 64, mb: 1 };

// Elements
function BoardItem({ board }: AppPropInterface) {
	// Redux
	const { id: userId } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const isOwner = userId === board?.ownerId ? true : false;

	// Return
	return (
		<Card sx={cardStyles}>
			<CardActionArea component={RouterLink} to={`/boards/${board?.id}`}>
				<CardContent sx={cardHeaderStyles}>
					{board?.members?.length > 0 && <Members memberIds={board.members} />}
				</CardContent>
				<CardContent sx={cardMainStyles}>
					<AssessmentSharpIcon sx={cardFooterStyles} />
					<Typography component="h5" variant="h5" gutterBottom>
						{board?.title}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				{isOwner && (
					<Button
						size="small"
						color="warning"
						onClick={() => dispatch(boardsDelete({ id: board?.id }))}
					>
						delete
					</Button>
				)}
				<Button
					component={RouterLink}
					to={`/boards/${board?.id}`}
					size="small"
					color="primary"
					sx={{
						ml: 'auto',
					}}
				>
					open
				</Button>
			</CardActions>
		</Card>
	);
}

export default BoardItem;
