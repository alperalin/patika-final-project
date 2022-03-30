import { CardInterface } from '../cards/types';
import { BoardInterface } from '../boards/types';

// Interfaces
interface ListInterface {
	id: number;
	title: string;
	boardId: number;
	board: BoardInterface;
	cards: CardInterface[];
	order: number | null;
	createdAt: string;
	updatedAt: string;
}

interface ListReduxInterface {
	data: ListInterface[];
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface ListCreateInterface {
	title: ListInterface['title'];
	order: ListInterface['order'];
	boardId: ListInterface['boardId'];
}

interface ListUpdateInterface {
	id: ListInterface['id'];
	title?: ListInterface['title'];
	order?: ListInterface['order'];
}

interface ListDeleteInterface {
	id: ListInterface['id'];
	boardId: ListInterface['boardId'];
}

export type {
	ListInterface,
	ListCreateInterface,
	ListUpdateInterface,
	ListDeleteInterface,
	ListReduxInterface,
};
