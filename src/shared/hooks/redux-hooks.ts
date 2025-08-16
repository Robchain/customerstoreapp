import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@store/store'

// Hooks tipados para Redux
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Hooks específicos para facilitar el acceso al estado
export const useAuth = () => useAppSelector((state) => state.auth)
export const useBuyer = () => useAppSelector((state) => state.buyer)