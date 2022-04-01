import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interface
import {
	BoardsMemberInterface,
	BoardsMemberCreateInterface,
	BoardsMemberDeleteInterface,
	BoardsMemberFetchInterface,
} from './types';

// entity
const boardsMemberEntity = new schema.Entity('boardsMember');

const boardsMemberAdapter = createEntityAdapter<any>();

// Redux Slice for BoardsMember
const boardsMemberSlice = createSlice({
	name: 'boardsMember',
	initialState: boardsMemberAdapter.getInitialState({
		status: 'idle',
		error: null,
	}),
	reducers: {
		clearStatus: (state) => {
			state.status = 'idle';
			state.error = null;
		},
		boardsMemberResetState: (state) => {
			state.status = 'idle';
			state.error = null;
			boardsMemberAdapter.removeAll(state);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				boardsMemberCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					boardsMemberAdapter.addOne(state, action.payload.data);
				}
			)
			.addCase(
				boardsMemberDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					boardsMemberAdapter.removeOne(state, action.payload.id);
				}
			)
			.addCase(boardsMemberFetchAll.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(
				boardsMemberFetchAll.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'succeeded';
					if (action.payload.boardsMember)
						boardsMemberAdapter.setAll(state, action.payload.boardsMember);
					return state;
				}
			);
	},
});

// Thunks
// Add a board member
const boardsMemberCreate = createAsyncThunk(
	'boardsMember/CREATE',
	async (payload: BoardsMemberCreateInterface) =>
		await api
			.post<BoardsMemberInterface>('/board-member', {
				username: payload.username,
				boardId: payload.boardId,
			})
			.then((response) => ({
				userId: payload.userId,
				boardId: payload.boardId,
				data: response.data,
			}))
);

// Delete a board member
const boardsMemberDelete = createAsyncThunk(
	'boardsMember/DELETE',
	async (payload: BoardsMemberDeleteInterface) =>
		await api
			.delete<string>(`/board-member/${payload.id}`)
			.then((response) => ({
				id: payload.id,
				userId: payload.userId,
				boardId: payload.boardId,
				data: response.data,
			}))
);

// fetchAll
const boardsMemberFetchAll = createAsyncThunk(
	'boardsMember/FETCH_ALL',
	async (payload: BoardsMemberFetchInterface) => {
		const data = await api
			.get<BoardsMemberInterface[]>(`/board-member?boardId=${payload.boardId}`)
			.then((response) => response.data);
		const normalizedData = normalize(data, [boardsMemberEntity]);
		return normalizedData.entities;
	}
);

// Export Actions
const { clearStatus, boardsMemberResetState } = boardsMemberSlice.actions;

// Exports
export {
	boardsMemberEntity,
	boardsMemberCreate,
	boardsMemberDelete,
	boardsMemberFetchAll,
	clearStatus,
	boardsMemberResetState,
};

// Export selector
export const boardsMemberSelector = (state: RootState) => state.boardsMember;

export const {
	selectAll: selectBoardsMemberAll,
	selectTotal: selectBoardsMemberTotal,
	selectById: selectBoardsMemberById,
	selectIds: selectBoardsMemberIds,
	selectEntities: selectBoardsMemberEntities,
} = boardsMemberAdapter.getSelectors((state: RootState) => state.boardsMember);

// Return member by user id
export const selectBoardsMemberByUserId = createSelector(
	[selectBoardsMemberAll, (state: RootState, userId: number) => userId],
	(boardsMember, userId) => {
		return boardsMember.find((member) => member.userId === userId);
	}
);

// Export boardsSlice Reducer as Default
export default boardsMemberSlice.reducer;
