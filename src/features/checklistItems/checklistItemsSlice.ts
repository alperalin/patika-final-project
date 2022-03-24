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

const checklistItemsAdapter = createEntityAdapter<any>();

// Redux Slice for ChecklistItems
const checklistItemsSlice = createSlice({
	name: 'checklistItems',
	initialState: checklistItemsAdapter.getInitialState(),
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
				if (action.payload.checklistItems)
					checklistItemsAdapter.upsertMany(
						state,
						action.payload.checklistItems
					);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = checklistItemsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, fetchAll };

// Export selector
export const checklistItemsSelector = (state: RootState) =>
	state.checklistItems;

export const {
	selectAll: selectAllChecklistItems,
	selectById: selectChecklistItemsById,
} = checklistItemsAdapter.getSelectors(
	(state: RootState) => state.checklistItems
);

export const selectChecklistItemsByCardId = createSelector(
	[
		selectAllChecklistItems,
		(state: RootState, checklistId: number) => checklistId,
	],
	(checklistItems, checklistId) =>
		checklistItems.filter(
			(checklistItem) => checklistItem.checklistId === checklistId
		)
);

// Export boardsSlice Reducer as Default
export default checklistItemsSlice.reducer;
