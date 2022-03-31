import {
	createSlice,
	createEntityAdapter,
	createSelector,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

// Store
import type { RootState } from '../store';
import { listsCreate, listsDelete, listsEntity } from '../lists/listsSlice';
import { usersEntity } from '../users/usersSlice';
import {
	boardsMemberCreate,
	boardsMemberDelete,
} from '../boardsMember/boardsMemberSlice';

// API
import api from '../../api';

// Interfaces
import {
	BoardInterface,
	BoardUpdateInterface,
	BoardReduxInterface,
} from './types';

// Entities
// const membersEntity = new schema.Entity('members');
const boardsEntity = new schema.Entity('boards', {
	lists: [listsEntity],
	cards: [listsEntity],
	members: [usersEntity],
});

// Adapter
const boardsAdapter = createEntityAdapter<any>();

// Redux Slice for Boards
const boardsSlice = createSlice({
	name: 'boards',
	initialState: boardsAdapter.getInitialState({
		status: 'idle',
		error: null,
	}),
	reducers: {
		clearStatus: (state) => {
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(boardsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				boardsAdapter.addOne(state, action.payload);
			})
			.addCase(boardsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				boardsAdapter.removeOne(state, action.payload.id);
			})
			.addCase(boardsUpdate.fulfilled, (state, action: PayloadAction<any>) => {
				boardsAdapter.updateOne(state, {
					id: action.payload.id,
					changes: { ...action.payload },
				});
			})
			.addCase(boardsFetchAll.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(
				boardsFetchAll.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'succeeded';
					if (action.payload.boards)
						boardsAdapter.upsertMany(state, action.payload.boards);
					return state;
				}
			)
			.addCase(boardsFetchById.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'succeeded';
					if (action.payload.boards)
						boardsAdapter.upsertMany(state, action.payload.boards);
					return state;
				}
			)
			.addCase(listsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, boardId } = action.payload;
				state.entities[boardId].lists.push(id);
			})
			.addCase(listsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, boardId } = action.payload;
				const index = state.entities[boardId].lists.findIndex(
					(list: number) => list === id
				);
				state.entities[boardId].lists.splice(index, 1);
			})
			.addCase(
				boardsMemberCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { userId, boardId } = action.payload;
					state.entities[boardId].members.push(userId);
				}
			)
			.addCase(
				boardsMemberDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { userId, boardId } = action.payload;
					const index = state.entities[boardId].members.findIndex(
						(member: number) => member === userId
					);
					state.entities[boardId].members.splice(index, 1);
				}
			);
	},
});

// Thunks
// Board Endpoints
// Create
const boardsCreate = createAsyncThunk(
	'boards/CREATE',
	async (payload: Pick<BoardInterface, 'title'>) =>
		await api
			.post<BoardInterface>('/board', payload)
			.then((response) => response.data)
);

// Update
const boardsUpdate = createAsyncThunk(
	'boards/UPDATE',
	async (payload: BoardUpdateInterface) =>
		await api
			.put<BoardInterface>(`/board/${payload.id}`, {
				title: payload.title,
				members: payload.members,
			})
			.then((response) => response.data)
);

// Delete
const boardsDelete = createAsyncThunk(
	'boards/DELETE',
	async (payload: Pick<BoardInterface, 'id'>) =>
		await api
			.delete<string>(`/board/${payload.id}`)
			.then((response) => ({ id: payload.id, data: response.data }))
);

// fetchById
const boardsFetchById = createAsyncThunk(
	'boards/FETCH_BY_ID',
	async (payload: Pick<BoardInterface, 'id'>) => {
		const data = await api
			.get<BoardInterface>(`/board/${payload.id}`)
			.then((response) => response.data);
		const normalizedData = normalize(data, boardsEntity);
		return normalizedData.entities;
	}
);

// fetchAll
const boardsFetchAll = createAsyncThunk('boards/FETCH_ALL', async () => {
	const data = await api
		.get<BoardInterface[]>('/board')
		.then((response) => response.data);
	const normalizedData = normalize(data, [boardsEntity]);
	return normalizedData.entities;
});

// Export Actions
const { clearStatus } = boardsSlice.actions;

// Exports
export {
	boardsCreate,
	boardsUpdate,
	boardsDelete,
	boardsFetchById,
	boardsFetchAll,
	clearStatus,
};

// Export selector
export const boardSelector = (state: RootState) => state.boards;

export const {
	selectAll: selectBoardsAll,
	selectTotal: selectBoardsTotal,
	selectById: selectBoardsById,
	selectIds: selectBoardsIds,
	selectEntities: selectBoardsEntities,
} = boardsAdapter.getSelectors((state: RootState) => state.boards);

// Export boardsSlice Reducer as Default
export default boardsSlice.reducer;
