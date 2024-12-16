import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import useFormikErrors from './useFormikErrors'
import useWindowDimensions from './useWindowDimensions'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useFormikErrors, useWindowDimensions }
