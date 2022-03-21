import { BoardInterface } from '../board';
import { CardInterface } from '../card';

// Interfaces
interface ListInterface {
	id: number;
	title: string;
	boardId: number;
	board: BoardInterface;
	cards: CardInterface[] | [];
	order: number | null;
	createdAt: string;
	updatedAt: string;
}

export type { ListInterface };
