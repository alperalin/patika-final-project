import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// Reducers
import userReducer from './user/userSlice';
import boardsReducer from './boards/boardsSlice';
import boardsMemberReducer from './boardsMember/boardsMemberSlice';
import listsReducer from './lists/listsSlice';
import cardsReducer from './cards/cardsSlice';
import commentsReducer from './comments/commentsSlice';
import labelsReducer from './labels/labelsSlice';
import cardLabelsReducer from './cardLabels/cardLabelsSlice';
import checklistsReducer from './checklists/checklistsSlice';
import checklistItemsReducer from './checklistItems/checklistItemsSlice';
import usersReducer from './users/usersSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		boards: boardsReducer,
		boardsMember: boardsMemberReducer,
		lists: listsReducer,
		cards: cardsReducer,
		comments: commentsReducer,
		labels: labelsReducer,
		cardLabels: cardLabelsReducer,
		checklists: checklistsReducer,
		checklistItems: checklistItemsReducer,
		users: usersReducer,
	},
});

// Export Store
export default store;

// Export Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
