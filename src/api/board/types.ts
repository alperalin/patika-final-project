import { ListInterface } from '../list/types';
import { UserInterface } from '../user';

// Interfaces
interface BoardInterface {
	id: number;
	title: string;
	ownerId: number;
	owner: UserInterface;
	members: UserInterface[] | [];
	lists: ListInterface[] | [];
	createdAt: string;
	updatedAt: string;
}

export type { BoardInterface };
