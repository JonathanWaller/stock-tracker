import { configureStore } from '@reduxjs/toolkit'

// import user from './redux/slices/userSlice';
// import table from './redux/slices/tableSlice';
// import common from './redux/slices/commonSlice';
// import organization from './redux/slices/organizationSlice';
// import document from './redux/slices/documentSlice';

import list from './redux/listSlice'

const store = configureStore( {
    reducer: {
        list
    },
    // research non-serialized values further to look for better solution
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(({
        serializableCheck: false // removes console error about non-serialized values
    }))
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;