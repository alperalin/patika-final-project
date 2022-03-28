import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';

// Interfaces
import {
	ListInterface,
	ListCreateInterface,
	ListDeleteInterface,
	ListReduxInterface,
	ListUpdateInterface,
} from './types';
import api from '../../api';
import { cardsCreate, cardsDelete } from '../cards/cardsSlice';

// const initialState: BoardReduxInterface = {
// 	data: [],
// 	apiStatus: 'idle',
// 	apiMessage: null,
// };

const listsAdapter = createEntityAdapter<any>({
	sortComparer: (a, b) => {
		return a['order'] - b['order'];
	},
});

// Redux Slice for Lists
const listsSlice = createSlice({
	name: 'lists',
	initialState: listsAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
		// listChangeCardOrder: (state, action) => {
		// 	console.log(action);
		// 	const list = selectListsEntities(state.lists);
		// 	console.log(list);
		// },
		// changeOrder: (state, action) => {
		// 	listsAdapter.updateMany(state, [
		// 		{
		// 			id: action.payload.dragItemId,
		// 			changes: { order: action.payload.hoverOrder },
		// 		},
		// 		{
		// 			id: action.payload.hoverItemId,
		// 			changes: { order: action.payload.dragOrder },
		// 		},
		// 	]);
		// },
	},
	extraReducers(builder) {
		builder
			.addCase(listsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.addOne(state, action.payload);
			})
			.addCase(listsUpdate.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.updateOne(state, {
					id: action.payload.id,
					changes: { ...action.payload },
				});
			})
			.addCase(listsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.removeOne(state, action.payload.id);
			})
			.addCase(cardsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, listId } = action.payload;
				state.entities[listId].cards.push(id);
			})
			.addCase(cardsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, listId } = action.payload;
				const index = state.entities[listId].cards.findIndex(
					(card: number) => card === id
				);
				state.entities[listId].cards.splice(index, 1);
			})
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.lists)
						listsAdapter.upsertMany(state, action.payload.lists);
					return state;
				}
			);
	},
});

// Thunks
// Add a list
const listsCreate = createAsyncThunk(
	'lists/CREATE',
	async (payload: ListCreateInterface) =>
		await api
			.post<ListInterface>('/list', {
				title: payload.title,
				order: payload.order,
				boardId: payload.boardId,
			})
			.then((response) => response.data)
);

// Update a list
const listsUpdate = createAsyncThunk(
	'lists/UPDATE',
	async (payload: ListUpdateInterface) =>
		await api
			.put<ListInterface>(`/list/${payload.id}`, {
				title: payload.title,
				order: payload.order,
			})
			.then((response) => response.data)
);

// Delete a list
const listsDelete = createAsyncThunk(
	'lists/DELETE',
	async (payload: ListDeleteInterface) =>
		await api.delete<string>(`/list/${payload.id}`).then((response) => ({
			id: payload.id,
			boardId: payload.boardId,
			data: response.data,
		}))
);

// Update
// const listUpdate = createAsyncThunk(
// 	'boards/UPDATE',
// 	async (payload: BoardUpdateInterface) =>
// 		await api
// 			.put<BoardInterface>(`/board/${payload.id}`, {
// 				title: payload.title,
// 				members: payload.members,
// 			})
// 			.then((response) => response.data)
// );

// Export Actions
// const { changeOrder, listChangeCardOrder } = listsSlice.actions;

// Exports
// export { changeOrder, listChangeCardOrder };
export { listsCreate, listsUpdate, listsDelete };

// Export selector
export const listsSelector = (state: RootState) => state.lists;

export const {
	selectAll: selectListsAll,
	selectTotal: selectListsTotal,
	selectById: selectListsById,
	selectIds: selectListsIds,
	selectEntities: selectListsEntities,
} = listsAdapter.getSelectors((state: RootState) => state.lists);

export const selectListsByBoardId = createSelector(
	[selectListsAll, (state: RootState, boardId: number) => boardId],
	(lists, boardId) => lists.filter((list) => list.boardId === boardId)
);

// Export boardsSlice Reducer as Default
export default listsSlice.reducer;
