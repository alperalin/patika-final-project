import { ChecklistItemInterface } from '../checklistItem';

// Interfaces
interface ChecklistInterface {
	id: number;
	cardId: number;
	title: string;
	items: ChecklistItemInterface[] | [];
	createdAt: string;
	updatedAt: string;
}

export type { ChecklistInterface };
