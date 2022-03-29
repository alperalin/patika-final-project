import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { normalize, schema } from 'normalizr';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';

// Api
import api from '../../api';

// Interfaces
import {
	LabelInterface,
	LabelReduxInterface,
	CardLabelInterface,
} from './types';

// Entity
const labelsEntity = new schema.Entity('labels');

// Adapter
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
			labelsFetchAll.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.labels)
					labelsAdapter.upsertMany(state, action.payload.labels);
				return state;
			}
		);
	},
});

// Thunks
// fetchAll
const labelsFetchAll = createAsyncThunk('labels/FETCH_ALL', async () => {
	const data = await api
		.get<LabelInterface[]>('/label')
		.then((response) => response.data);
	const normalizedData = normalize(data, [labelsEntity]);
	return normalizedData.entities;
});

// Export Actions
// const { clearStatus } = labelsSlice.actions;

// Exports
export { labelsEntity, labelsFetchAll };

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
