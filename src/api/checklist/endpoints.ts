// imports
import api from '..';
import { ChecklistInterface } from './types';

// Checklist Endpoints
// Create
const create = async (
	cardId: Pick<ChecklistInterface, 'cardId'>,
	title: Pick<ChecklistInterface, 'title'>
) => await api.post<ChecklistInterface>('/checklist', { cardId, title });

// Update
const update = async (
	id: Pick<ChecklistInterface, 'id'>,
	title?: Pick<ChecklistInterface, 'title'>
) => await api.put<ChecklistInterface>(`/checklist/${id}`, { title });

// Delete
const destroy = async (id: Pick<ChecklistInterface, 'id'>) =>
	await api.delete<string>(`/checklist/${id}`);

// Export endpoints methods
export { create, update, destroy };
