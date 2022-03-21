// imports
import api from '..';
import { CardInterface } from './types';

// Card Endpoints
// Create
const create = async (
	title: Pick<CardInterface, 'title'>,
	listId: Pick<CardInterface, 'listId'>,
	description?: Pick<CardInterface, 'description'>,
	duedate?: Pick<CardInterface, 'duedate'>
) =>
	await api.post<CardInterface>('/card', {
		title,
		listId,
		description,
		duedate,
	});

// Update
const update = async (
	id: Pick<CardInterface, 'id'>,
	title?: Pick<CardInterface, 'title'>,
	listId?: Pick<CardInterface, 'listId'>,
	description?: Pick<CardInterface, 'description'>,
	duedate?: Pick<CardInterface, 'duedate'>,
	order?: Pick<CardInterface, 'order'>
) =>
	await api.put<CardInterface>(`/card/${id}`, {
		title,
		listId,
		description,
		duedate,
		order,
	});

// Delete
const destroy = async (id: Pick<CardInterface, 'id'>) =>
	await api.delete<string>(`/card/${id}`);

// Get By Id
const getById = async (id: Pick<CardInterface, 'id'>) =>
	await api.get<CardInterface>(`/card/${id}`);

// Get All
const getAll = async (listId?: Pick<CardInterface, 'listId'>) =>
	await api.get<CardInterface[]>(`/card${listId ? `?listId=${listId}` : ''}`);

// Export endpoints methods
export { create, update, destroy, getById, getAll };
