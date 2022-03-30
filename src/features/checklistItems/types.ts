// Interfaces
interface ChecklistItemInterface {
	id: number;
	checklistId: number;
	title: string;
	isChecked: boolean;
	createdAt: string;
	updatedAt: string;
}

interface ChecklistItemCreateInterface {
	title: ChecklistItemInterface['title'];
	checklistId: ChecklistItemInterface['checklistId'];
	isChecked: ChecklistItemInterface['isChecked'];
}

interface ChecklistItemUpdateInterface {
	id: ChecklistItemInterface['id'];
	isChecked: ChecklistItemInterface['isChecked'];
}

interface ChecklistItemDeleteInterface {
	id: ChecklistItemInterface['id'];
	checklistId: ChecklistItemInterface['checklistId'];
}

export type {
	ChecklistItemInterface,
	ChecklistItemCreateInterface,
	ChecklistItemUpdateInterface,
	ChecklistItemDeleteInterface,
};
