import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	createSelector,
	PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Boards
import { boardsFetchAll, boardsFetchById } from '../boards/boardsSlice';

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

// const membersAdapter = createEntityAdapter<any>();

// Redux Slice for categories
// const membersSlice = createSlice({
// 	name: 'members',
// 	initialState: membersAdapter.getInitialState(),
// 	reducers: {
// 		// clearStatus: (state) => {
// 		// 	state.apiStatus = 'idle';
// 		// 	return state;
// 		// },
// 	},
// 	extraReducers(builder) {
// 		builder
// 			.addCase(
// 				boardsFetchAll.fulfilled,
// 				(state, action: PayloadAction<any>) => {
// 					if (action.payload.members)
// 						membersAdapter.upsertMany(state, action.payload.members);
// 					return state;
// 				}
// 			)
// 			.addCase(
// 				boardsFetchById.fulfilled,
// 				(state, action: PayloadAction<any>) => {
// 					if (action.payload.members)
// 						membersAdapter.upsertMany(state, action.payload.members);
// 					return state;
// 				}
// 			);
// 	},
// });

// Export Actions
// const { clearStatus } = boardsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, boardsFetchAll };

// Export selector
// export const membersSelector = (state: RootState) => state.members;

// export const {
// 	selectAll: selectMembersAll,
// 	selectTotal: selectMembersTotal,
// 	selectById: selectMembersById,
// 	selectIds: selectMembersIds,
// 	selectEntities: selectMembersEntities,
// } = membersAdapter.getSelectors((state: RootState) => state.members);

// Export boardsSlice Reducer as Default
// export default membersSlice.reducer;
