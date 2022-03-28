// import
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
	commentsDelete,
	selectCommentsById,
} from '../../features/comments/commentsSlice';

// Mui
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { selectUsersById } from '../../features/users/usersSlice';

// Interface
interface PropsInterface {
	commentId: number;
}

// Styles
const commentBoxStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	width: '100%',
	pr: 6,
	pl: 6,
	mb: 2,
};

const avatarStyles = {
	width: 32,
	height: 32,
	fontSize: '1rem',
	mr: 2,
};

const textBoxStyles = {
	width: 'calc(100% - 104px)',
	border: '1px solid rgba(0,0,0,0.25)',
	color: '#666',
	borderRadius: 1,
	padding: 1,
};

const spanStyles = {
	display: 'block',
	fontWeight: '700',
	textTransform: 'capitalize',
	mb: 1,
};

const pStyles = { textTransform: 'capitalize', m: 0 };

const iconStyles = { ml: 1 };

function CommentsItem({ commentId }: PropsInterface) {
	// Redux
	const { id, message, cardId, authorId } = useAppSelector((state) =>
		selectCommentsById(state, commentId)
	);
	const { username } = useAppSelector((state) =>
		selectUsersById(state, authorId)
	);
	const dispatch = useAppDispatch();

	// Function
	function handleCommentRemove(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();

		// Dispatch comment remove
		dispatch(commentsDelete({ id, cardId }));
	}

	// Element
	return (
		<Box sx={commentBoxStyle}>
			<Avatar sx={avatarStyles}>{username.charAt(0)}</Avatar>
			<Box sx={textBoxStyles}>
				<Box component="span" sx={spanStyles}>
					{username}
				</Box>
				<Box component="p" sx={pStyles}>
					{message}
				</Box>
			</Box>
			<IconButton sx={iconStyles} onClick={handleCommentRemove}>
				<DeleteOutlineSharpIcon />
			</IconButton>
		</Box>
	);
}

export default CommentsItem;
