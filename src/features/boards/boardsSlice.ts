import {
	createSlice,
	createEntityAdapter,
	createSelector,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interfaces
import {
	BoardInterface,
	BoardUpdateInterface,
	BoardReduxInterface,
} from './types';

// const initialState: BoardReduxInterface = {
// 	data: [],
// 	apiStatus: 'idle',
// 	apiMessage: null,
// };

// Entities
const checklistItems = new schema.Entity('checklistItems');
const labels = new schema.Entity('labels');
const comments = new schema.Entity('comments');
const checklists = new schema.Entity('checklists', {
	items: [checklistItems],
});

const cardsEntity = new schema.Entity('cards', {
	labels: [labels],
	comments: [comments],
	checklists: [checklists],
});

const listsEntity = new schema.Entity('lists', {
	cards: [cardsEntity],
});

const membersEntity = new schema.Entity('members');

const boardsEntity = new schema.Entity('boards', {
	lists: [listsEntity],
	cards: [listsEntity],
	members: [membersEntity],
});

// Adapter
const boardsAdapter = createEntityAdapter<any>();

// Redux Slice for Boards
const boardsSlice = createSlice({
	name: 'boards',
	initialState: boardsAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAll.fulfilled, (state, action: PayloadAction<any>) => {
				boardsAdapter.upsertMany(state, action.payload.boards);
			})
			.addCase(fetchById.fulfilled, (state, action: PayloadAction<any>) => {
				boardsAdapter.upsertMany(state, action.payload.boards);
			});

		// // Create
		// builder
		// 	.addCase(create.pending, (state, action) => {
		// 		state.apiStatus = 'loading';
		// 	})
		// 	.addCase(create.fulfilled, (state, action) => {
		// 		state.apiStatus = 'succeeded';
		// 		state.data = [...state.data, { ...action.payload }];
		// 	})
		// 	.addCase(create.rejected, (state, action) => {
		// 		state.apiStatus = 'failed';
		// 		state.apiMessage = action.error.message || null;
		// 	});

		// // Update
		// builder
		// 	.addCase(update.pending, (state, action) => {
		// 		state.apiStatus = 'loading';
		// 	})
		// 	.addCase(update.fulfilled, (state, action) => {
		// 		state.apiStatus = 'succeeded';

		// 		const { id } = action.payload;
		// 		const index = state.data.findIndex((item) => item.id === id);

		// 		state.data = [
		// 			...state.data.slice(0, index),
		// 			action.payload,
		// 			...state.data.slice(index + 1),
		// 		];
		// 	})
		// 	.addCase(update.rejected, (state, action) => {
		// 		state.apiStatus = 'failed';
		// 		state.apiMessage = action.error.message || null;
		// 	});

		// // Destory
		// builder
		// 	.addCase(destroy.pending, (state, action) => {
		// 		state.apiStatus = 'loading';
		// 	})
		// 	.addCase(destroy.fulfilled, (state, action) => {
		// 		state.apiStatus = 'succeeded';

		// 		const { id } = action.payload;
		// 		const index = state.data.findIndex((item) => item.id === id);

		// 		state.data = [
		// 			...state.data.slice(0, index),
		// 			...state.data.slice(index + 1),
		// 		];
		// 	})
		// 	.addCase(destroy.rejected, (state, action) => {
		// 		state.apiStatus = 'failed';
		// 		state.apiMessage = action.error.message || null;
		// 	});

		// FetchAll
		// .addCase(fetchAll.pending, (state, action) => {
		// 	state.apiStatus = 'loading';
		// })
		// .addCase(fetchAll.fulfilled, (state, action) => {
		// 	state.apiStatus = 'succeeded';
		// 	state.data = [...action.payload];
		// })
		// .addCase(fetchAll.rejected, (state, action) => {
		// 	state.apiStatus = 'failed';
		// 	state.apiMessage = action.error.message || null;
		// });
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
const fetchById = createAsyncThunk(
	'boards/getById',
	async (payload: Pick<BoardInterface, 'id'>) => {
		const data = await api
			.get<BoardInterface>(`/board/${payload.id}`)
			.then((response) => response.data);
		const normalizedData = normalize(data, boardsEntity);
		console.log('FetchedById');
		console.log(normalizedData);
		return normalizedData.entities;
	}
);

// Get All
// const fetchAll = createAsyncThunk(
// 	'boards/fetchAll',
// 	async () =>
// 		await api.get<BoardInterface[]>('/board').then((response) => response.data)
// );

const fetchAll = createAsyncThunk('boards/fetchAll', async () => {
	const data = await api
		.get<BoardInterface[]>('/board')
		.then((response) => response.data);
	const normalizedData = normalize(data, [boardsEntity]);
	console.log('FetchedAll');
	console.log(normalizedData);
	return normalizedData.entities;
});

// Export Actions
// const { clearStatus } = boardsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, fetchAll };
export { create, update, destroy, fetchById, fetchAll };

// Export selector
export const boardSelector = (state: RootState) => state.boards;

export const { selectAll: selectAllBoards } = boardsAdapter.getSelectors(
	(state: RootState) => state.boards
);

// Export boardsSlice Reducer as Default
export default boardsSlice.reducer;
