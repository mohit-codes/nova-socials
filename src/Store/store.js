import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import notificationReducer from "../features/notification/notificationSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
  },
});
