// import
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectUsersById } from '../../features/users/usersSlice';
import {
	boardsMemberCreate,
	boardsMemberDelete,
	selectBoardsMemberByUserId,
} from '../../features/boardsMember/boardsMemberSlice';

// Mui
import {
	Checkbox,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

// Interface
import { BoardsMemberInterface } from '../../features/boardsMember/types';
interface PropsInterface {
	userId: number;
	boardId: number;
}

function MembersMenuItem({ userId, boardId }: PropsInterface) {
	// Redux
	const { username } = useAppSelector((state) =>
		selectUsersById(state, userId)
	);
	const boardMember: BoardsMemberInterface = useAppSelector((state) =>
		selectBoardsMemberByUserId(state, userId)
	);
	const dispatch = useAppDispatch();

	// States
	const [checked, setChecked] = useState<boolean>(
		userId === boardMember?.userId ? true : false
	);

	// Function
	function handleToggle() {
		// Secimin bir sonraki degerine gore dispatch yapiliyor
		if (!checked) {
			dispatch(boardsMemberCreate({ userId, username, boardId }));
		} else {
			dispatch(boardsMemberDelete({ id: boardMember.id, userId, boardId }));
		}
		setChecked((prev) => !prev);
	}

	// Element
	return (
		<ListItem key={userId} disablePadding>
			<ListItemButton role={undefined} onClick={handleToggle} dense>
				<ListItemIcon>
					<Checkbox
						edge="start"
						checked={checked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-list-label-${userId}` }}
					/>
				</ListItemIcon>
				<ListItemText id={`checkbox-list-label-${userId}`} primary={username} />
			</ListItemButton>
		</ListItem>
	);
}

export default MembersMenuItem;
