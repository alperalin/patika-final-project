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
	BoardInterface,
	BoardUpdateInterface,
	BoardReduxInterface,
} from './types';

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
		listChangeCardOrder: (state, action) => {
			// 	console.log(action);
			// 	const list = selectListsEntities(state.lists);
			// 	console.log(list);
		},
		changeOrder: (state, action) => {
			listsAdapter.updateMany(state, [
				{
					id: action.payload.dragItemId,
					changes: { order: action.payload.hoverOrder },
				},
				{
					id: action.payload.hoverItemId,
					changes: { order: action.payload.dragOrder },
				},
			]);
		},
	},
	extraReducers(builder) {
		builder.addCase(
			boardsFetchById.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.lists)
					listsAdapter.setAll(state, action.payload.lists);
				return state;
			}
		);
	},
});

// Thunks
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
const { changeOrder, listChangeCardOrder } = listsSlice.actions;

// Exports
export { changeOrder, listChangeCardOrder };

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