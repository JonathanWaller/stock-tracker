import { configureStore } from '@reduxjs/toolkit'

import list from './redux/listSlice'

const store = configureStore( {
    reducer: {
        list
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(({
        serializableCheck: false // removes console error about non-serialized values
    }))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;