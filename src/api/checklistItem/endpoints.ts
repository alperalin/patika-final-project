// imports
import api from '..';
import { ChecklistItemInterface } from './types';

// ChecklistItem Endpoints
// Create
const create = async (
	cardId: Pick<ChecklistItemInterface, 'checklistId'>,
	title: Pick<ChecklistItemInterface, 'title'>,
	isChecked: Pick<ChecklistItemInterface, 'isChecked'>
) =>
	await api.post<ChecklistItemInterface>('/checklist-item', {
		cardId,
		title,
		isChecked,
	});

// Update
const update = async (
	id: Pick<ChecklistItemInterface, 'id'>,
	title?: Pick<ChecklistItemInterface, 'title'>,
	isChecked?: Pick<ChecklistItemInterface, 'isChecked'>
) =>
	await api.put<ChecklistItemInterface>(`/checklist-item/${id}`, {
		title,
		isChecked,
	});

// Delete
const destroy = async (id: Pick<ChecklistItemInterface, 'id'>) =>
	await api.delete<string>(`/checklist-item/${id}`);

// Export endpoints methods
export { create, update, destroy };
