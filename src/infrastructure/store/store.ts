import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth-slice'
import buyerSlice from './slices/buyer-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    buyer: buyerSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: import.meta.env.DEV
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store