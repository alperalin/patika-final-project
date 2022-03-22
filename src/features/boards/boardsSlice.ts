import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

// API
import api from '../../api';

// Interfaces
import {
	BoardInterface,
	BoardUpdateInterface,
	BoardReduxInterface,
} from './types';

const initialState: BoardReduxInterface = {
	data: [],
	apiStatus: 'idle',
	apiMessage: null,
};

// Redux Slice for categories
const boardsSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		clearStatus: (state) => {
			state.apiStatus = 'idle';
			return state;
		},
	},
	extraReducers(builder) {
		// Login
		builder
			.addCase(create.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(create.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.data = [...state.data, { ...action.payload }];
			})
			.addCase(create.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});

		// Register
		builder
			.addCase(update.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(update.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';

				const { id } = action.payload;
				const index = state.data.findIndex((item) => item.id === id);

				state.data = [
					...state.data.slice(0, index),
					action.payload,
					...state.data.slice(index + 1),
				];
			})
			.addCase(update.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});

		// destory
		builder
			.addCase(destroy.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(destroy.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';

				const { id } = action.payload;
				const index = state.data.findIndex((item) => item.id === id);

				state.data = [
					...state.data.slice(0, index),
					...state.data.slice(index + 1),
				];
			})
			.addCase(destroy.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});

		// fetchAll
		builder
			.addCase(fetchAll.pending, (state, action) => {
				state.apiStatus = 'loading';
			})
			.addCase(fetchAll.fulfilled, (state, action) => {
				state.apiStatus = 'succeeded';
				state.data = [...action.payload];
			})
			.addCase(fetchAll.rejected, (state, action) => {
				state.apiStatus = 'failed';
				state.apiMessage = action.error.message || null;
			});
	},
});

// Thunks
// Board Endpoints
// Create
const create = createAsyncThunk(
	'boards/create',
	async (payload: Pick<BoardInterface, 'title'>) =>
		await api
			.post<BoardInterface>('/board', payload)
			.then((response) => response.data)
);

// Update
const update = createAsyncThunk(
	'boards/update',
	async (payload: BoardUpdateInterface) =>
		await api
			.put<BoardInterface>(`/board/${payload.id}`, {
				title: payload.title,
				members: payload.members,
			})
			.then((response) => response.data)
);

// Delete
const destroy = createAsyncThunk(
	'boards/destroy',
	async ({ id }: Pick<BoardInterface, 'id'>) =>
		await api
			.delete<string>(`/board/${id}`)
			.then((response) => ({ id, data: response.data }))
);

// Get By Id
// const getById = createAsyncThunk(
// 	'boards/getById',
// 	async (payload: Pick<BoardInterface, 'id'>) =>
// 		await api
// 			.get<BoardInterface>(`/board/${payload.id}`)
// 			.then((response) => response.data)
// );

// Get All
const fetchAll = createAsyncThunk(
	'boards/fetchAll',
	async () =>
		await api.get<BoardInterface[]>('/board').then((response) => response.data)
);

// Export Actions
const { clearStatus } = boardsSlice.actions;

// Exports
export { clearStatus, create, update, destroy, fetchAll };

// Export selector
export const userSelector = (state: RootState) => state.boards;

// Export boardsSlice Reducer as Default
export default boardsSlice.reducer;
