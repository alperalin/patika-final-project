import { ChecklistInterface } from '../checklist';
import { CommentInterface } from '../comment';
import { LabelInterface } from '../label';

// Interfaces
interface CardInterface {
	id: number;
	title: string;
	listId: number;
	description: string | null;
	duedate: string | null;
	order: number | null;
	labels: LabelInterface[] | [];
	checklists: ChecklistInterface[] | [];
	comments: CommentInterface[] | [];
	createdAt: string;
	updatedAt: string;
}

export type { CardInterface };
