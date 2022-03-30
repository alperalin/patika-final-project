// Imports
import { useAppSelector } from '../../hooks/hooks';
import { selectUsersById } from '../../features/users/usersSlice';

// Mui
import { Avatar } from '@mui/material';

// interface
interface PropsInterface {
	memberId: number;
}

// Element
function MemberAvatar({ memberId }: PropsInterface) {
	const { username } = useAppSelector((state) =>
		selectUsersById(state, memberId)
	);

	// Return
	return <Avatar key={memberId}>{username.charAt(0)}</Avatar>;
}

export default MemberAvatar;
