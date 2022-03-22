import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// Reducers
import userReducer from '../user/userSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
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
