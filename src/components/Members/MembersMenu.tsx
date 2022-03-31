// Imports
import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectUsersIds } from '../../features/users/usersSlice';
import { selectBoardsById } from '../../features/boards/boardsSlice';

// Component
import MembersMenuItem from './MembersMenuItem';

// Mui
import { Box, Button, List, Menu } from '@mui/material';

// Interface
interface PropsInterface {
	boardId: number;
}

// Styles
const shareButtonStyles = {
	color: '#fff',
	border: 0,
	ml: 1,
	'&:hover': {
		border: 0,
	},
};

function MembersMenu({ boardId }: PropsInterface) {
	// States
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	// Redux
	const { id: userId } = useAppSelector((state) => state.user);
	const board = useAppSelector((state) => selectBoardsById(state, boardId));
	const userIds = useAppSelector((state) => selectUsersIds(state));

	const isOwner = userId === board?.ownerId ? true : false;

	// Variables
	const open = Boolean(anchorEl);

	// Functions
	function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return isOwner && userIds?.length > 1 ? (
		<>
			<Button
				id="members-menu-button"
				variant="outlined"
				sx={shareButtonStyles}
				aria-controls={open ? 'members-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOpen}
			>
				Share
			</Button>

			<Menu
				id="members-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'members-menu-button',
				}}
			>
				<Box sx={{ p: 0 }}>
					<List sx={{ width: 200, p: 0 }}>
						{userIds.map(
							(userId) =>
								Number(userId) !== board?.ownerId && (
									<MembersMenuItem
										key={userId}
										userId={Number(userId)}
										boardId={boardId}
									/>
								)
						)}
					</List>
				</Box>
			</Menu>
		</>
	) : null;
}

export default MembersMenu;
