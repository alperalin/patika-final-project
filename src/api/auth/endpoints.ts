// imports
import api from '..';
import { UserInterface, LoginInterface, RegisterInterface } from './types';

// Login Endpoint
const login = async (payload: LoginInterface) =>
	await api.post<UserInterface>('/auth/login', payload).then((response) => {
		api.defaults.headers.common[
			'Authorization'
		] = `Bearer ${response.data.token}`;
		return response;
	});

// Register Endpoint
const register = async (payload: RegisterInterface) =>
	await api.post<UserInterface>('/auth/register', payload).then((response) => {
		api.defaults.headers.common[
			'Authorization'
		] = `Bearer ${response.data.token}`;
		return response;
	});

// Export endpoints methods
export { login, register };
