// imports
import api from '..';
import { CommentInterface } from './types';

// Comment Endpoints
// Create
const create = async (
	cardId: Pick<CommentInterface, 'cardId'>,
	message: Pick<CommentInterface, 'message'>
) => await api.post<CommentInterface>('/comment', { cardId, message });

// Delete
const destroy = async (id: Pick<CommentInterface, 'id'>) =>
	await api.delete<string>(`/comment/${id}`);

// Export endpoints methods
export { create, destroy };
