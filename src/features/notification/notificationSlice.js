import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/utility";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/users/notifications/${userId}`
      );
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    errMessage: null,
  },
  reducers: {
    addNewNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.loading = true;
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.errorMessage;
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.errMessage = "";
      state.notifications = action.payload.notifications;
      state.loading = false;
    },
  },
});

export const { addNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
