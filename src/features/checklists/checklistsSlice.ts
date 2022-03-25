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

const checklistsAdapter = createEntityAdapter<any>();

// Redux Slice for Checklists
const checklistsSlice = createSlice({
	name: 'checklists',
	initialState: checklistsAdapter.getInitialState(),
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
				if (action.payload.checklists)
					checklistsAdapter.upsertMany(state, action.payload.checklists);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = checklistsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, boardsFetchAll };

// Export selector
export const checklistsSelector = (state: RootState) => state.checklists;

export const {
	selectAll: selectChecklistsAll,
	selectTotal: selectChecklistsTotal,
	selectById: selectChecklistsById,
	selectIds: selectChecklistsIds,
	selectEntities: selectChecklistsEntities,
} = checklistsAdapter.getSelectors((state: RootState) => state.checklists);

// export const selectChecklistsByCardId = createSelector(
// 	[selectAllChecklists, (state: RootState, cardId: number) => cardId],
// 	(checklists, cardId) =>
// 		checklists.filter((checklist) => checklist.cardId === cardId)
// );

// Export boardsSlice Reducer as Default
export default checklistsSlice.reducer;
