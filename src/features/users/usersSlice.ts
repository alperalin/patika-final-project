import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import type { RootState } from '../store';

// API
import api from '../../api';

// Interface
import { UsersInterface } from './types';

// entity
const usersEntity = new schema.Entity('users');

// const initialState: BoardReduxInterface = {
// 	data: [],
// 	apiStatus: 'idle',
// 	apiMessage: null,
// };

const usersAdapter = createEntityAdapter<any>();

// Redux Slice for Users
const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
	},
	extraReducers(builder) {
		builder.addCase(
			usersFetchAll.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.users)
					usersAdapter.upsertMany(state, action.payload.users);
				return state;
			}
		);
	},
});

// Thunks
// fetchAll
const usersFetchAll = createAsyncThunk('users/FETCH_ALL', async () => {
	const data = await api
		.get<UsersInterface[]>('/user')
		.then((response) => response.data);
	const normalizedData = normalize(data, [usersEntity]);
	return normalizedData.entities;
});

// Export Actions
// const { clearStatus } = usersSlice.actions;

// Exports
export { usersEntity, usersFetchAll };

// Export selector
export const usersSelector = (state: RootState) => state.users;

export const {
	selectAll: selectUsersAll,
	selectTotal: selectUsersTotal,
	selectById: selectUsersById,
	selectIds: selectUsersIds,
	selectEntities: selectUsersEntities,
} = usersAdapter.getSelectors((state: RootState) => state.users);

// Export boardsSlice Reducer as Default
export default usersSlice.reducer;
