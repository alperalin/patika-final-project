import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// API
import api from '../../api';

// interfaces
import {
	UserReduxInterface,
	UserInterface,
	LoginInterface,
	RegisterInterface,
} from './types';

const initialState: UserReduxInterface = {
	id: null,
	username: '',
	token: '',
	isLoggedIn: false,
	apiStatus: 'idle',
	apiMessage: null,
};

// Redux Slice for categories
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser: (state) => {
			return { ...state, ...initialState };
		},
		clearStatus: (state) => {
			state.apiStatus = 'idle';
			return state;
		},
	},
	extraReducers(builder) {
		// Login
		builder
			.addCase(login.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.id = action.payload.id;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.isLoggedIn = true;

				// Set Axios Authorization
				api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
			})
			.addCase(login.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});

		// Register
		builder
			.addCase(register.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.id = action.payload.id;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.isLoggedIn = true;

				// Set Axios Authorization
				api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
			})
			.addCase(register.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});

		// Verify
		builder
			.addCase(verify.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(verify.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.id = action.payload.id;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(verify.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.isLoggedIn = false;
			});
	},
});

// Thunks
// Login Endpoint
const login = createAsyncThunk(
	'user/login',
	async (payload: LoginInterface) =>
		await api
			.post<UserInterface>('/auth/login', payload)
			.then((response) => response.data)
);

// Register Endpoint
const register = createAsyncThunk(
	'user/register',
	async (payload: RegisterInterface) =>
		await api
			.post<UserInterface>('/auth/register', payload)
			.then((response) => response.data)
);

// Verify User Endpoint
const verify = createAsyncThunk(
	'user/verify',
	async (cookie: string) =>
		await api
			.get<UserInterface>('/auth/user')
			.then((response) => ({ ...response.data, token: cookie }))
);

// Export Actions
const { clearUser, clearStatus } = userSlice.actions;

// Exports
export { clearUser, clearStatus, login, register, verify };

// Export selector
export const userSelector = (state: RootState) => state.user;

// Export userSlice Reducer as Default
export default userSlice.reducer;
