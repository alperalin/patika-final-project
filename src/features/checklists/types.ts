import { ChecklistItemInterface } from '../checklistItems/types';

// Interfaces
interface ChecklistInterface {
	id: number;
	cardId: number;
	title: string;
	items: ChecklistItemInterface[];
	createdAt: string;
	updatedAt: string;
}

interface CheckListCreateInterface {
	title: ChecklistInterface['title'];
	cardId: ChecklistInterface['cardId'];
}

interface CheckListDeleteInterface {
	id: ChecklistInterface['id'];
	cardId: ChecklistInterface['cardId'];
}

export type {
	ChecklistInterface,
	CheckListCreateInterface,
	CheckListDeleteInterface,
};
