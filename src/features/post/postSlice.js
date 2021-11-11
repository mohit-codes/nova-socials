import axios from "axios";
import { BASE_URL } from "../../utils/utility";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchUserFeed = createAsyncThunk(
  "post/fetchFeed",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/feed/${userId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "post/fetchUserPosts",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/users/get-user-posts/${userId}`
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

export const createPost = createAsyncThunk(
  "post/createPost",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/posts/new`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/posts/like`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/posts/comment`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/posts/unlike`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/posts/delete/${postId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchPostLikes = createAsyncThunk(
  "post/fetchPostLikes",
  async ({ postId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/post/likes/${postId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  "post/fetchPostComments",
  async ({ postId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/post/comments/${postId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    feed: [],
    userPosts: [],
    likes: [],
    comments: [],
    loading: false,
    errMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserFeed.fulfilled]: (state, action) => {
      state.feed = action.payload.feed;
      state.loading = false;
    },
    [fetchUserFeed.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.errorMessage;
    },
    [fetchUserFeed.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserPosts.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserPosts.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.errorMessage;
    },
    [fetchUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPosts = action.payload.posts;
    },
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.userPosts.unshift(action.payload.post);
      console.log(action.payload.post);
      state.feed.unshift(action.payload.post);
    },
    [likePost.pending]: (state) => {
      state.loading = true;
    },
    [likePost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [likePost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      const index = state.feed.findIndex(
        (post) => post._id === action.payload.postId
      );
      state.feed[index].likes.unshift(action.payload.likedBy.id);
      state.loading = false;
    },
    [commentPost.pending]: (state) => {
      state.loading = true;
    },
    [commentPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [commentPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.comments.unshift(action.payload.likedBy);
    },
    [unlikePost.pending]: (state) => {
      state.loading = true;
    },
    [unlikePost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [unlikePost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      const index = state.feed.findIndex(
        (post) => post._id === action.payload.postId
      );
      const indexOfId = state.feed[index].likes.indexOf(
        action.payload.unlikeBy
      );
      state.feed[index].likes.splice(indexOfId, 1);
      state.loading = false;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      const index = state.feed.findIndex(
        (post) => post._id === action.payload.postId
      );
      state.feed.splice(index, 1);
      state.loading = false;
    },
    [fetchPostLikes.pending]: (state) => {
      state.loading = true;
    },
    [fetchPostLikes.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchPostLikes.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.likes = action.payload.likes;
      state.loading = false;
    },
    [fetchPostComments.pending]: (state) => {
      state.loading = true;
    },
    [fetchPostComments.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.comments = action.payload.comments;
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
