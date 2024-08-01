import { configureStore } from '@reduxjs/toolkit'
import openReducer from './slice'

export const store = configureStore({
    reducer: {
        open: openReducer,
    },
})