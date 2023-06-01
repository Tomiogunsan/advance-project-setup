import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersReducer from '@/components/UsersManager/usersSlice'
import { counterReducer } from './counterSlice'

const rootReducer = combineReducers({
  users: usersReducer,
  counter: counterReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  // used when you dont want slice to be persisted
  // blacklist: ['users'],
  // used when you want whitelist the slice that is to be cached
  // whitelist: ['users'],
  storage,
}

export const resetStore = createAction('resetStore')




const appReducer: typeof rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
