// imports
import api from '..';
import { CardLabelInterface } from './types';

// CardLabel Endpoints
// Create
const create = async (
	cardId: Pick<CardLabelInterface, 'cardId'>,
	labelId: Pick<CardLabelInterface, 'labelId'>
) => await api.post<CardLabelInterface>('/card-label', { cardId, labelId });

// Delete
const destroy = async (id: Pick<CardLabelInterface, 'id'>) =>
	await api.delete<string>(`/card-label/${id}`);

// Export endpoints methods
export { create, destroy };
