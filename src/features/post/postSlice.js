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
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/get-user-posts`,
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

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/posts/update-post`, body);
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

export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async ({ commentId }, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/posts/comment/${commentId}`
      );
      console.log(data);
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
      const { data } = await axios.get(`${BASE_URL}/posts/likes/${postId}`);
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
      const { data } = await axios.get(`${BASE_URL}/posts/comments/${postId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "post/fetchSinglePost",
  async ({ postId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/posts/${postId}`);
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
    post: null,
    userPosts: [],
    likes: [],
    comments: [],
    loading: false,
    loadingLikes: false,
    loadingComments: false,
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
      state.err = "";
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
      state.feed.unshift(action.payload.post);
    },
    // [likePost.pending]: (state) => {
    //   state.loading = true;
    // },
    // [likePost.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.errorMessage;
    // },
    [likePost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      const index = state.feed.findIndex(
        (post) => post._id === action.payload.postId
      );
      state.feed[index].likes.unshift(action.payload.likedBy.id);
      state.feed[index].isLikedByUser = true;
      state.loading = false;
    },
    [commentPost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [commentPost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      console.log(action.payload.comment);
      state.comments.unshift(action.payload.comment);
      state.loading = false;
    },
    // [unlikePost.pending]: (state) => {
    //   state.loading = true;
    // },
    // [unlikePost.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload.errorMessage;
    // },
    [unlikePost.fulfilled]: (state, action) => {
      state.errorMessage = "";
      const index = state.feed.findIndex(
        (post) => post._id === action.payload.postId
      );
      const indexOfId = state.feed[index].likes.indexOf(
        action.payload.unlikeBy
      );
      state.feed[index].likes.splice(indexOfId, 1);
      state.feed[index].isLikedByUser = false;
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
      state.loadingLikes = true;
    },
    [fetchPostLikes.rejected]: (state, action) => {
      state.loadingLikes = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchPostLikes.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.likes = action.payload.likes;
      state.loadingLikes = false;
    },
    [fetchPostComments.pending]: (state) => {
      state.loadingComments = true;
    },
    [fetchPostComments.rejected]: (state, action) => {
      state.loadingComments = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.comments = action.payload.comments;
      state.loadingComments = false;
    },
    [fetchSinglePost.pending]: (state) => {
      state.loading = true;
    },
    [fetchSinglePost.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.post = action.payload.post;
      state.errMessage = "";
      state.loading = false;
    },
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.errorMessage;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.post.content = action.payload.post.content;
      state.loading = false;
      state.errMessage = "";
    },
    [deleteComment.fulfilled]: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload.commentId
      );
      state.comments.splice(index, 1);
    },
  },
});

export default postSlice.reducer;
