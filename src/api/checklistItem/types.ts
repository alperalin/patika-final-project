// Interfaces
interface ChecklistItemInterface {
	id: number;
	checklistId: number;
	title: string;
	isChecked: boolean;
	createdAt: string;
	updatedAt: string;
}

export type { ChecklistItemInterface };
