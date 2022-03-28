import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';

// Interfaces
import {
	CardInterface,
	CardCreateInterface,
	CardUpdateInterface,
	CardDeleteInterface,
	CardReduxInterface,
} from './types';
import api from '../../api';

// const initialState: BoardReduxInterface = {
// 	data: [],
// 	apiStatus: 'idle',
// 	apiMessage: null,
// };

const cardsAdapter = createEntityAdapter<any>({
	sortComparer: (a, b) => {
		return a['order'] - b['order'];
	},
});

// Redux Slice for Cards
const cardsSlice = createSlice({
	name: 'cards',
	initialState: cardsAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
		cardsChangeOrder: (state, action) => {
			console.log(action);
			cardsAdapter.updateOne(state, {
				id: Number(action.payload.draggableId),
				changes: { order: action.payload.destination.index },
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.cards)
						cardsAdapter.setAll(state, action.payload.cards);
					return state;
				}
			)
			.addCase(cardsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				cardsAdapter.addOne(state, action.payload);
			})
			.addCase(cardsUpdate.fulfilled, (state, action: PayloadAction<any>) => {
				cardsAdapter.updateOne(state, {
					id: action.payload.id,
					changes: { ...action.payload },
				});
			})
			.addCase(cardsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				cardsAdapter.removeOne(state, action.payload.id);
			});
	},
});

// Thunks
// Add a card
const cardsCreate = createAsyncThunk(
	'cards/CREATE',
	async (payload: CardCreateInterface) =>
		await api
			.post<CardInterface>('/card', {
				title: payload.title,
				order: payload.order,
				listId: payload.listId,
			})
			.then((response) => response.data)
);

// Update a card
const cardsUpdate = createAsyncThunk(
	'cards/UPDATE',
	async (payload: CardUpdateInterface) =>
		await api
			.put<CardInterface>(`/card/${payload.id}`, {
				title: payload.title,
				order: payload.order,
			})
			.then((response) => response.data)
);

// Delete a card
const cardsDelete = createAsyncThunk(
	'cards/DELETE',
	async (payload: CardDeleteInterface) =>
		await api.delete<string>(`/card/${payload.id}`).then((response) => ({
			id: payload.id,
			listId: payload.listId,
			data: response.data,
		}))
);

// Export Actions
const { cardsChangeOrder } = cardsSlice.actions;

// Exports
export { cardsCreate, cardsUpdate, cardsDelete, cardsChangeOrder };

// Export selector
export const cardsSelector = (state: RootState) => state.cards;

export const {
	selectAll: selectCardsAll,
	selectTotal: selectCardsTotal,
	selectById: selectCardsById,
	selectIds: selectCardsIds,
	selectEntities: selectCardsEntities,
} = cardsAdapter.getSelectors((state: RootState) => state.cards);

// Export boardsSlice Reducer as Default
export default cardsSlice.reducer;
