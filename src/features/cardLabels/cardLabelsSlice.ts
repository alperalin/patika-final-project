import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	createSelector,
	PayloadAction,
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

const cardLabelsAdapter = createEntityAdapter<any>();

// Redux Slice for categories
const cardLabelsSlice = createSlice({
	name: 'cardLabels',
	initialState: cardLabelsAdapter.getInitialState(),
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
				if (action.payload.cardLabels)
					cardLabelsAdapter.upsertMany(state, action.payload.cardLabels);
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
export const cardLabelsSelector = (state: RootState) => state.cardLabels;

export const {
	selectAll: selectCardLabelsAll,
	selectTotal: selectCardLabelsTotal,
	selectById: selectCardLabelsById,
	selectIds: selectCardLabelsIds,
	selectEntities: selectCardLabelsEntities,
} = cardLabelsAdapter.getSelectors((state: RootState) => state.cardLabels);

// Export boardsSlice Reducer as Default
export default cardLabelsSlice.reducer;
