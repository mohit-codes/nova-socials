import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import notificationReducer from "../features/notification/notificationSlice";
import messageReducer from "../features/message/messageSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
    message: messageReducer,
  },
});
