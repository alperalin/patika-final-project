import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { schema } from 'normalizr';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';

// Interfaces
import {
	CardLabelInterface,
	CardLabelCreateInterface,
	CardLabelDeleteInterface,
} from './types';
import api from '../../api';

// Entity
const cardLabelsEntity = new schema.Entity('cardLabels');

// Adapter
const cardLabelsAdapter = createEntityAdapter<any>();

// Redux Slice for categories
const cardLabelsSlice = createSlice({
	name: 'cardLabels',
	initialState: cardLabelsAdapter.getInitialState(),
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(
				cardLabelsCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					cardLabelsAdapter.addOne(state, action.payload);
				}
			)
			.addCase(
				cardLabelsDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					cardLabelsAdapter.removeOne(state, action.payload.id);
				}
			)
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.labels?.CardLabel)
						cardLabelsAdapter.upsertMany(
							state,
							action.payload.labels.CardLabel
						);
					return state;
				}
			);
	},
});

// Thunks
// Add a card
const cardLabelsCreate = createAsyncThunk(
	'cardLabels/CREATE',
	async (payload: CardLabelCreateInterface) =>
		await api
			.post<CardLabelInterface>('/card-label', {
				labelId: payload.labelId,
				cardId: payload.cardId,
			})
			.then((response) => response.data)
);

// Delete a card
const cardLabelsDelete = createAsyncThunk(
	'cardLabels/DELETE',
	async (payload: CardLabelDeleteInterface) =>
		await api.delete<string>(`/card-label/${payload.id}`).then((response) => ({
			id: payload.id,
			labelId: payload.labelId,
			cardId: payload.cardId,
			data: response.data,
		}))
);

// Export Actions
// const {} = boardsSlice.actions;

// Exports
export { cardLabelsEntity, cardLabelsCreate, cardLabelsDelete };

// Export selector
export const cardLabelsSelector = (state: RootState) => state.cardLabels;

export const {
	selectAll: selectCardLabelsAll,
	selectTotal: selectCardLabelsTotal,
	selectById: selectCardLabelsById,
	selectIds: selectCardLabelsIds,
	selectEntities: selectCardLabelsEntities,
} = cardLabelsAdapter.getSelectors((state: RootState) => state.cardLabels);

export const selectCardLabelsByCardId = createSelector(
	[selectCardLabelsAll, (state: RootState, cardId: number) => cardId],
	(cardLabels, cardId) =>
		cardLabels.filter((cardLabel) => cardLabel.cardId === cardId)
);

// Export boardsSlice Reducer as Default
export default cardLabelsSlice.reducer;
