import { Action, AnyAction, configureStore } from '@reduxjs/toolkit'
import rootSlice from './rootSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'


const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootSlice);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, 
Action>;
export type AppThunkDispatch = ThunkDispatch<{}, void, AnyAction>