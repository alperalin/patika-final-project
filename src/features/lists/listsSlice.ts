import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Boards
import { fetchById } from '../boards/boardsSlice';

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

const listsAdapter = createEntityAdapter<any>();

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
			fetchById.fulfilled,
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
// export { clearStatus, create, update, destroy, fetchAll };

// Export selector
export const listsSelector = (state: RootState) => state.lists;

export const { selectAll: selectAllLists, selectById: selectListsById } =
	listsAdapter.getSelectors((state: RootState) => state.lists);

export const selectListsByBoardId = createSelector(
	[selectAllLists, (state: RootState, boardId: number) => boardId],
	(lists, boardId) => lists.filter((list) => list.boardId === boardId)
);

// Export boardsSlice Reducer as Default
export default listsSlice.reducer;
