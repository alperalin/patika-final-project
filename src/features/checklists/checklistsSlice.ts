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
import {
	checklistItemCreate,
	checklistItemDelete,
	checklistItemsEntity,
} from '../checklistItems/checklistItemsSlice';

// Interface
import {
	ChecklistInterface,
	CheckListCreateInterface,
	CheckListDeleteInterface,
} from './types';

// Entity
const checklistsEntity = new schema.Entity('checklists', {
	items: [checklistItemsEntity],
});

// Adapter
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
		builder
			.addCase(
				checklistsCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					checklistsAdapter.addOne(state, action.payload);
				}
			)
			.addCase(
				checklistsDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					checklistsAdapter.removeOne(state, action.payload.id);
				}
			)
			.addCase(
				checklistItemCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, checklistId } = action.payload;
					if (state.entities[checklistId].items) {
						state.entities[checklistId].items.push(id);
					} else {
						state.entities[checklistId].items = [id];
					}
				}
			)
			.addCase(
				checklistItemDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					const { id, checklistId } = action.payload;
					const index = state.entities[checklistId].items.findIndex(
						(item: number) => item === id
					);
					state.entities[checklistId].items.splice(index, 1);
				}
			)
			.addCase(
				boardsFetchById.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload.checklists)
						checklistsAdapter.upsertMany(state, action.payload.checklists);
					return state;
				}
			);
	},
});

// Thunks
// Create
const checklistsCreate = createAsyncThunk(
	'checklists/CREATE',
	async (payload: CheckListCreateInterface) =>
		await api
			.post<ChecklistInterface>('/checklist', {
				title: payload.title,
				cardId: payload.cardId,
			})
			.then((response) => response.data)
);

// Delete
const checklistsDelete = createAsyncThunk(
	'checklists/DELETE',
	async (payload: CheckListDeleteInterface) =>
		await api.delete<string>(`/checklist/${payload.id}`).then((response) => ({
			id: payload.id,
			cardId: payload.cardId,
			data: response.data,
		}))
);

// Export Actions
// const { clearStatus } = checklistsSlice.actions;

// Exports
export { checklistsEntity, checklistsCreate, checklistsDelete };

// Export selector
export const checklistsSelector = (state: RootState) => state.checklists;

export const {
	selectAll: selectChecklistsAll,
	selectTotal: selectChecklistsTotal,
	selectById: selectChecklistsById,
	selectIds: selectChecklistsIds,
	selectEntities: selectChecklistsEntities,
} = checklistsAdapter.getSelectors((state: RootState) => state.checklists);

// Export boardsSlice Reducer as Default
export default checklistsSlice.reducer;
