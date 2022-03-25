import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	PayloadAction,
	createSelector,
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

const commentsAdapter = createEntityAdapter<any>();

// Redux Slice for Comments
const commentsSlice = createSlice({
	name: 'comments',
	initialState: commentsAdapter.getInitialState(),
	reducers: {
		// clearStatus: (state) => {
		// 	state.apiStatus = 'idle';
		// 	return state;
		// },
	},
	extraReducers(builder) {
		builder.addCase(
			boardsFetchById.fulfilled,
			(state, action: PayloadAction<any>) => {
				if (action.payload.comments)
					commentsAdapter.upsertMany(state, action.payload.comments);
				return state;
			}
		);
	},
});

// Export Actions
// const { clearStatus } = commentsSlice.actions;

// Exports
// export { clearStatus, create, update, destroy, boardsFetchAll };

// Export selector
export const commentsSelector = (state: RootState) => state.comments;

export const {
	selectAll: selectCommentsAll,
	selectTotal: selectCommentsTotal,
	selectById: selectCommentsById,
	selectIds: selectCommentsIds,
	selectEntities: selectCommentsEntities,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

// export const selectCommentsByCardId = createSelector(
// 	[selectAllComments, (state: RootState, cardId: number) => cardId],
// 	(comments, cardId) => comments.filter((comment) => comment.cardId === cardId)
// );

// Export boardsSlice Reducer as Default
export default commentsSlice.reducer;
