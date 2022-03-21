// imports
import api from '..';
import { UserInterface } from './types';

// User Endpoints
// Get All
const getAll = async () => await api.get<UserInterface[]>('/user');

// Export endpoints methods
export { getAll };
