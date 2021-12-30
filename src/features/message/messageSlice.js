import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/utility";

export const fetchChats = createAsyncThunk(
  "message/fetchChats",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/chats/${userId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/messages/get_messages`,
        body
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

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async ({ messageId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/messages/${messageId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deleteChat = createAsyncThunk(
  "message/deleteChat",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/messages/delete-chat`,
        body
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

const messageSlice = createSlice({
  name: "message",
  initialState: {
    chats: [],
    messages: [],
    loadingChats: false,
    loadingMessages: false,
    error: null,
  },
  reducers: {
    newMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    newChat: (state, action) => {
      state.chats.push(action.payload);
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state) => {
      state.loadingChats = true;
    },
    [fetchChats.rejected]: (state, action) => {
      state.error = action.payload.errorMessage;
      state.loadingChats = false;
    },
    [fetchChats.fulfilled]: (state, action) => {
      state.chats = action.payload.chats;
      state.error = "";
      state.loadingChats = false;
    },
    [fetchMessages.pending]: (state) => {
      state.loadingMessages = true;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.error = action.payload.errorMessage;
      state.loadingMessages = false;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
      state.error = "";
      state.loadingMessages = false;
    },
    [deleteMessage.fulfilled]: (state, action) => {
      state.messages = state.messages.filter(
        (message) =>
          message.messageId.toString() !== action.payload.messageId.toString()
      );
    },
    [deleteChat.fulfilled]: (state, action) => {
      state.chats = state.chats.filter(
        (recipient) =>
          recipient._id.toString() !== action.payload.recipientId.toString()
      );
    },
  },
});

export const { newMessage, newChat } = messageSlice.actions;

export default messageSlice.reducer;
