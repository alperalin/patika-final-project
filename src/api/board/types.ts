import { ListInterface } from '../list/types';
import { UsersInterface } from '../user';

// Interfaces
interface BoardInterface {
	id: number;
	title: string;
	ownerId: number;
	owner: UsersInterface;
	members: UsersInterface[] | [];
	lists: ListInterface[] | [];
	createdAt: string;
	updatedAt: string;
}

export type { BoardInterface };
