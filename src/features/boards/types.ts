import { ListInterface } from '../../api/list/types';
import { UsersInterface } from '../../api/user/types';

// Interfaces
interface BoardInterface {
	id: number;
	title: string;
	ownerId: number;
	owner: UsersInterface;
	members: UsersInterface[];
	lists: ListInterface[];
	createdAt: string;
	updatedAt: string;
}

interface BoardReduxInterface {
	data: BoardInterface[];
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface BoardUpdateInterface {
	id: Pick<BoardInterface, 'id'>;
	title: Pick<BoardInterface, 'title'>;
	members?: Pick<BoardInterface, 'members'>;
}

export type { BoardInterface, BoardUpdateInterface, BoardReduxInterface };
