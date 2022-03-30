import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { schema } from 'normalizr';

// API
import api from '../../api';

// Boards
import { boardsFetchById } from '../boards/boardsSlice';
import { cardsCreate, cardsDelete, cardsEntity } from '../cards/cardsSlice';

// Interfaces
import {
	ListInterface,
	ListCreateInterface,
	ListDeleteInterface,
	ListReduxInterface,
	ListUpdateInterface,
} from './types';

// Entity
const listsEntity = new schema.Entity('lists', {
	cards: [cardsEntity],
});

// Adapter
const listsAdapter = createEntityAdapter<any>({
	sortComparer: (a, b) => a['order'] - b['order'],
});

// Redux Slice for Lists
const listsSlice = createSlice({
	name: 'lists',
	initialState: listsAdapter.getInitialState({
		status: 'idle',
		error: null,
	}),
	reducers: {
		listClearStatus: (state) => {
			state.status = 'idle';
		},
		listChangeCardOrder: (state, action: PayloadAction<any>) => {
			// Set status to pending
			state.status = 'pending';

			// Get payload
			const { draggableId, destination, source } = action.payload;

			// Get list
			const startList = state.entities[source.droppableId];
			const finishList = state.entities[destination.droppableId];

			// Dnd in same list
			if (startList === finishList) {
				// Create a new array from changed list's cards
				const startCardIds = [...startList.cards];

				// Remove the moved card from from array
				startCardIds.splice(source.index, 1);
				// Put card to new position
				startCardIds.splice(destination.index, 0, Number(draggableId));

				// Update start list with new order
				listsAdapter.updateOne(state, {
					id: startList.id,
					changes: { cards: [...startCardIds] },
				});

				// set status to succeeded
				state.status = 'succeeded';
				return;
			}

			// Dnd in different lists
			// Get start list's cards
			const startCardIds = [...startList.cards];

			// Remove the moved card from from array
			startCardIds.splice(source.index, 1);

			// Update start list without moved card
			listsAdapter.updateOne(state, {
				id: startList.id,
				changes: { cards: [...startCardIds] },
			});

			// Get finish list's cards
			const finishCardIds = [...finishList.cards];

			// Put moved card to it's new list
			finishCardIds.splice(destination.index, 0, Number(draggableId));

			// Update finish list with new order
			listsAdapter.updateOne(state, {
				id: finishList.id,
				changes: { cards: [...finishCardIds] },
			});

			// set status to succeeded
			state.status = 'succeeded';
		},
	},
	extraReducers(builder) {
		builder
			.addCase(listsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.addOne(state, action.payload);
			})
			.addCase(listsUpdate.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.updateOne(state, {
					id: action.payload.id,
					changes: { ...action.payload },
				});
			})
			.addCase(listsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				listsAdapter.removeOne(state, action.payload.id);
			})
			.addCase(cardsCreate.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, listId } = action.payload;
				state.entities[listId].cards.push(id);
			})
			.addCase(cardsDelete.fulfilled, (state, action: PayloadAction<any>) => {
				const { id, listId } = action.payload;
				const index = state.entities[listId].cards.findIndex(
					(card: number) => card === id
				);
				state.entities[listId].cards.splice(index, 1);
			})
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.lists)
						listsAdapter.upsertMany(state, action.payload.lists);
					return state;
				}
			);
	},
});

// Thunks
// Add a list
const listsCreate = createAsyncThunk(
	'lists/CREATE',
	async (payload: ListCreateInterface) =>
		await api
			.post<ListInterface>('/list', {
				title: payload.title,
				order: payload.order,
				boardId: payload.boardId,
			})
			.then((response) => response.data)
);

// Update a list
const listsUpdate = createAsyncThunk(
	'lists/UPDATE',
	async (payload: ListUpdateInterface) =>
		await api
			.put<ListInterface>(`/list/${payload.id}`, {
				title: payload.title,
				order: payload.order,
			})
			.then((response) => response.data)
);

// Delete a list
const listsDelete = createAsyncThunk(
	'lists/DELETE',
	async (payload: ListDeleteInterface) =>
		await api.delete<string>(`/list/${payload.id}`).then((response) => ({
			id: payload.id,
			boardId: payload.boardId,
			data: response.data,
		}))
);

// Export Actions
const { listClearStatus, listChangeCardOrder } = listsSlice.actions;

// Exports
export {
	listsEntity,
	listsCreate,
	listsUpdate,
	listsDelete,
	listClearStatus,
	listChangeCardOrder,
};

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
