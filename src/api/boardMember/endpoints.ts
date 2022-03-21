// imports
import api from '..';
import { BoardMemberInterface } from './types';

// BoardMember Endpoints
// Create
const create = async (
	username: Pick<BoardMemberInterface, 'username'>,
	boardId: Pick<BoardMemberInterface, 'boardId'>
) =>
	await api.post<BoardMemberInterface>('/board-member', {
		username,
		boardId,
	});

// Delete
const destroy = async (id: Pick<BoardMemberInterface, 'id'>) =>
	await api.delete<string>(`/board-member/${id}`);

// Get all
const getAll = async (boardId: Pick<BoardMemberInterface, 'boardId'>) =>
	await api.delete<BoardMemberInterface[]>(`/board-member?boardId=${boardId}`);

// Export endpoints methods
export { create, destroy, getAll };
