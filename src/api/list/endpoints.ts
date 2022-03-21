// imports
import api from '..';
import { ListInterface } from './types';

// List Endpoints
// Create
const create = async (
	title: Pick<ListInterface, 'title'>,
	boardId: Pick<ListInterface, 'boardId'>
) => await api.post<ListInterface>('/list', { title, boardId });

// Update
const update = async (
	id: Pick<ListInterface, 'id'>,
	title?: Pick<ListInterface, 'title'>,
	boardId?: Pick<ListInterface, 'boardId'>,
	order?: Pick<ListInterface, 'order'>
) => await api.put<ListInterface>(`/list/${id}`, { title, boardId, order });

// Delete
const destroy = async (id: Pick<ListInterface, 'id'>) =>
	await api.delete<string>(`/list/${id}`);

// Get By Id
const getById = async (id: Pick<ListInterface, 'id'>) =>
	await api.get<ListInterface>(`/list/${id}`);

// Get All
const getAll = async (boardId?: Pick<ListInterface, 'boardId'>) =>
	await api.get<ListInterface[]>(
		`/list${boardId ? `?boardId=${boardId}` : ''}`
	);

// Export endpoints methods
export { create, update, destroy, getById, getAll };
