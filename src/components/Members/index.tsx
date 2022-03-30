// Component
import MemberAvatar from './MemberAvatar';

// Mui
import { AvatarGroup } from '@mui/material';

// interface
interface PropsInterface {
	memberIds: number[];
	maxAvatar?: number;
}

function Members({ memberIds, maxAvatar = 2 }: PropsInterface) {
	return (
		<AvatarGroup
			max={maxAvatar}
			sx={{
				'& .MuiAvatar-root': {
					width: 30,
					height: 30,
					fontSize: '1rem',
				},
			}}
		>
			{memberIds.map((memberId: number) => (
				<MemberAvatar key={memberId} memberId={memberId} />
			))}
		</AvatarGroup>
	);
}

export default Members;
