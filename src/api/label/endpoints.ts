// imports
import api from '..';
import { LabelInterface } from './types';

// Label Endpoints
// Get All
const getAll = async () => await api.get<LabelInterface[]>('/label');

// Export endpoints methods
export { getAll };
