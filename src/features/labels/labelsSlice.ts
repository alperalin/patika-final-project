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

const labelsAdapter = createEntityAdapter<any>();

// Redux Slice for Labels
const labelsSlice = createSlice({
	name: 'labels',
	initialState: labelsAdapter.getInitialState(),
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
				if (action.payload.labels)
					labelsAdapter.upsertMany(state, action.payload.labels);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = labelsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, boardsFetchAll };

// Export selector
export const labelsSelector = (state: RootState) => state.labels;

export const {
	selectAll: selectLabelsAll,
	selectTotal: selectLabelsTotal,
	selectById: selectLabelsById,
	selectIds: selectLabelsIds,
	selectEntities: selectLabelsEntities,
} = labelsAdapter.getSelectors((state: RootState) => state.labels);

// export const selectLabelsByCardId = createSelector(
// 	[selectAllLabels, (state: RootState, cardId: number) => cardId],
// 	(labels, cardId) => labels.filter((label) => label.cardId === cardId)
// );

// Export boardsSlice Reducer as Default
export default labelsSlice.reducer;
