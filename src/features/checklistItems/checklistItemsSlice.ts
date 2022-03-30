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

// interface
import {
	ChecklistItemInterface,
	ChecklistItemCreateInterface,
	ChecklistItemUpdateInterface,
	ChecklistItemDeleteInterface,
} from './types';

// Entity
const checklistItemsEntity = new schema.Entity('checklistItems');

// Adapter
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
		builder
			.addCase(
				checklistItemCreate.fulfilled,
				(state, action: PayloadAction<any>) => {
					checklistItemsAdapter.addOne(state, action.payload);
				}
			)
			.addCase(
				checklistItemUpdate.fulfilled,
				(state, action: PayloadAction<any>) => {
					checklistItemsAdapter.updateOne(state, {
						id: action.payload.id,
						changes: { ...action.payload },
					});
				}
			)
			.addCase(
				checklistItemDelete.fulfilled,
				(state, action: PayloadAction<any>) => {
					checklistItemsAdapter.removeOne(state, action.payload.id);
				}
			)
			.addCase(
				boardsFetchById.fulfilled,
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

// Thunks
// Create
const checklistItemCreate = createAsyncThunk(
	'checklistItem/CREATE',
	async (payload: ChecklistItemCreateInterface) =>
		await api
			.post<ChecklistItemInterface>('/checklist-item', {
				title: payload.title,
				checklistId: payload.checklistId,
				isChecked: payload.isChecked,
			})
			.then((response) => response.data)
);

// Update
const checklistItemUpdate = createAsyncThunk(
	'checklistItem/UPDATE',
	async (payload: ChecklistItemUpdateInterface) =>
		await api
			.put<ChecklistItemInterface>(`/checklist-item/${payload.id}`, {
				id: payload.id,
				isChecked: payload.isChecked,
			})
			.then((response) => response.data)
);

// Delete
const checklistItemDelete = createAsyncThunk(
	'checklistItem/DELETE',
	async (payload: ChecklistItemDeleteInterface) =>
		await api
			.delete<string>(`/checklist-item/${payload.id}`)
			.then((response) => ({
				id: payload.id,
				checklistId: payload.checklistId,
				data: response.data,
			}))
);

// Export Actions
// const { clearStatus } = checklistItemsSlice.actions;

// Exports
export {
	checklistItemsEntity,
	checklistItemCreate,
	checklistItemUpdate,
	checklistItemDelete,
};

// Export selector
export const checklistItemsSelector = (state: RootState) =>
	state.checklistItems;

export const {
	selectAll: selectChecklistItemsAll,
	selectTotal: selectChecklistItemsTotal,
	selectById: selectChecklistItemsById,
	selectIds: selectChecklistItemsIds,
	selectEntities: selectChecklistItemsEntities,
} = checklistItemsAdapter.getSelectors(
	(state: RootState) => state.checklistItems
);

export const selectCheckedItemsByChecklistId = createSelector(
	[
		selectChecklistItemsAll,
		(state: RootState, checklistId: number) => checklistId,
	],
	(checklistItems, checklistId) =>
		checklistItems.filter(
			(checklist) =>
				checklist.isChecked && checklist.checklistId === checklistId
		)
);

// Export boardsSlice Reducer as Default
export default checklistItemsSlice.reducer;
