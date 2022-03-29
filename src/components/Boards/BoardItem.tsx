// imports
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { boardsDelete } from '../../features/boards/boardsSlice';
// import { selectMembersEntities } from '../../features/members/membersSlice';

// Mui
import {
	Avatar,
	AvatarGroup,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';

interface AppPropInterface {
	board: any;
}

function BoardItem({ board }: AppPropInterface) {
	const { id: userId } = useAppSelector((state) => state.user);
	// const membersEntities = useAppSelector(selectMembersEntities);
	const dispatch = useAppDispatch();
	const isOwner = userId === board?.ownerId ? true : false;

	return (
		<Card
			sx={{
				width: '100%',
				minHeight: 216,
				height: '100%',
			}}
		>
			<CardActionArea component={RouterLink} to={`/boards/${board?.id}`}>
				<CardContent sx={{ height: '50px', padding: 1 }}>
					<AvatarGroup max={2}>
						{board?.members?.length &&
							board?.members.map((memberId: number) => (
								<Avatar
									key={memberId}
									sx={{
										width: 30,
										height: 30,
										fontSize: '1rem',
									}}
								>
									{/* {membersEntities[memberId].username.charAt(0)} */}
								</Avatar>
							))}
					</AvatarGroup>
				</CardContent>
				<CardContent sx={{ width: '100%', textAlign: 'center' }}>
					<AssessmentSharpIcon sx={{ fontSize: 64, mb: 1 }} />
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
