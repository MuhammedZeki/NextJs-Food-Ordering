import { configureStore } from '@reduxjs/toolkit'
import CardReducer  from './features/CardSlicer'

export const store = configureStore({
    reducer: {
      cart:CardReducer
  },
})