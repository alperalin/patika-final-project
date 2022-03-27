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
	BoardInterface,
	BoardUpdateInterface,
	BoardReduxInterface,
} from './types';

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
		builder.addCase(
			boardsFetchById.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.cards)
					cardsAdapter.setAll(state, action.payload.cards);
				return state;
			}
		);
	},
});

// Export Actions
const { cardsChangeOrder } = cardsSlice.actions;

// Exports
export { cardsChangeOrder };

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
