import { ChecklistInterface } from '../checklists/types';
import { CommentInterface } from '../comments/types';
import { LabelInterface } from '../labels/types';

// Interfaces
interface CardInterface {
	id: number;
	title: string;
	listId: number;
	description: string | null;
	duedate: string | null;
	order: number | null;
	labels: LabelInterface[];
	checklists: ChecklistInterface[];
	comments: CommentInterface[];
	createdAt: string;
	updatedAt: string;
}

interface CardReduxInterface {
	data: CardInterface[];
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface CardCreateInterface {
	title: CardInterface['title'];
	order: CardInterface['order'];
	listId: CardInterface['listId'];
}

interface CardUpdateInterface {
	id: CardInterface['id'];
	title?: CardInterface['title'];
	listId?: CardInterface['listId'];
	description?: CardInterface['description'];
	duedate?: CardInterface['duedate'];
	order?: CardInterface['order'];
}

interface CardDeleteInterface {
	id: CardInterface['id'];
	listId: CardInterface['listId'];
}

export type {
	CardInterface,
	CardCreateInterface,
	CardUpdateInterface,
	CardDeleteInterface,
	CardReduxInterface,
};
