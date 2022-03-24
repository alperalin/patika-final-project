import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Boards
import { fetchById } from '../boards/boardsSlice';

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

const cardsAdapter = createEntityAdapter<any>();

// Redux Slice for Cards
const cardsSlice = createSlice({
	name: 'cards',
	initialState: cardsAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
	},
	extraReducers(builder) {
		builder.addCase(
			fetchById.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.cards)
					cardsAdapter.upsertMany(state, action.payload.cards);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = boardsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, fetchAll };

// Export selector
export const cardsSelector = (state: RootState) => state.cards;

export const { selectAll: selectAllCards, selectById: selectCardsById } =
	cardsAdapter.getSelectors((state: RootState) => state.cards);

// Export boardsSlice Reducer as Default
export default cardsSlice.reducer;
