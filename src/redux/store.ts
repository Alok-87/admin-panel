import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import courseReducer from './slices/course'
import admissionReducer from './slices/admission'
import cloudinaryReducer from './slices/cloudinary'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    course :courseReducer,
    admission:admissionReducer,
    cloudinary:cloudinaryReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch