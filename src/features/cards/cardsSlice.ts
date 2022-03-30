import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	current,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { schema } from 'normalizr';

// API
import api from '../../api';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';
import {
	commentsCreate,
	commentsDelete,
	commentsEntity,
} from '../comments/commentsSlice';
import {
	checklistsCreate,
	checklistsDelete,
	checklistsEntity,
} from '../checklists/checklistsSlice';
import { labelsEntity } from '../labels/labelsSlice';
import { cardLabelsEntity } from '../cardLabels/cardLabelsSlice';

// Interfaces
import {
	CardInterface,
	CardCreateInterface,
	CardUpdateInterface,
	CardDeleteInterface,
	CardReduxInterface,
} from './types';

// const initialState: BoardReduxInterface = {
// 	data: [],
// 	apiStatus: 'idle',
// 	apiMessage: null,
// };

// Entity
const cardsEntity = new schema.Entity('cards', {
	labels: [labelsEntity],
	cardLabel: [cardLabelsEntity],
	comments: [commentsEntity],
	checklists: [checklistsEntity],
});

// Adapter
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
			})
			.addCase(
				checklistsCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, cardId } = action.payload;
					state.entities[cardId].checklists.push(id);
				}
			)
			.addCase(
				checklistsDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, cardId } = action.payload;
					const index = state.entities[cardId].checklists.findIndex(
						(checklist: number) => checklist === id
					);
					state.entities[cardId].checklists.splice(index, 1);
				}
			)
			.addCase(
				commentsCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, cardId } = action.payload;
					state.entities[cardId].comments.push(id);
				}
			)
			.addCase(
				commentsDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, cardId } = action.payload;
					const index = state.entities[cardId].comments.findIndex(
						(comment: number) => comment === id
					);
					state.entities[cardId].comments.splice(index, 1);
				}
			)
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.cards)
						cardsAdapter.setAll(state, action.payload.cards);
					return state;
				}
			);
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
				description: payload.description,
				duedate: payload.duedate,
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
export { cardsEntity, cardsCreate, cardsUpdate, cardsDelete, cardsChangeOrder };

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
