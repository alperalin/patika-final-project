import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// Reducers
import userReducer from '../user/userSlice';
import boardsReducer from '../boards/boardsSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		boards: boardsReducer,
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
