// imports
import api from '..';
import { BoardInterface } from './types';

// Board Endpoints
// Create
const create = async (payload: Pick<BoardInterface, 'title'>) =>
	await api.post<BoardInterface>('/board', payload);

// Update
const update = async (
	id: Pick<BoardInterface, 'id'>,
	title: Pick<BoardInterface, 'title'>,
	members?: number[]
) => await api.put<BoardInterface>(`/board/${id}`, { title, members });

// Delete
const destroy = async (id: Pick<BoardInterface, 'id'>) =>
	await api.delete<string>(`/board/${id}`);

// Get By Id
const getById = async (id: Pick<BoardInterface, 'id'>) =>
	await api.get<BoardInterface>(`/board/${id}`);

// Get All
const getAll = async () => await api.get<BoardInterface[]>('/board');

// Export endpoints methods
export { create, update, destroy, getById, getAll };
