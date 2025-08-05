import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import courseReducer from './slices/course'
import admissionReducer from './slices/admission'
import cloudinaryReducer from './slices/cloudinary'
import classReducer from './slices/liveClass'
import mediaReducer from './slices/media'
import announcementReducer from './slices/announcement'

export const store = configureStore({
  reducer: {
    auth : authReducer,
    course :courseReducer,
    admission:admissionReducer,
    cloudinary:cloudinaryReducer,
    class:classReducer,
    media :mediaReducer,
    announcement : announcementReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch