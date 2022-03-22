// imports
import api from '..';
import { UsersInterface } from './types';

// User Endpoints
// Get All
const getAll = async () => await api.get<UsersInterface[]>('/user');

// Export endpoints methods
export { getAll };
