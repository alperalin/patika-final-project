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
	sortComparer: (a, b) => a.order.localeCompare(b.order),
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
	},
	extraReducers(builder) {
		builder.addCase(
			boardsFetchById.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.lists)
					listsAdapter.upsertMany(state, action.payload.lists);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = boardsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, boardsFetchAll };

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
