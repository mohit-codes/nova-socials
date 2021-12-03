import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASE_URL } from "../../utils/utility";

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      if (data.success) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const signupUserAsync = createAsyncThunk(
  "user/signup",
  async ({ username, name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/signup`, {
        username,
        name,
        email,
        password,
      });
      if (data.success) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  "user/fetchUserFollowers",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/followers`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  "user/fetchUserFollowing",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/following`, body);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ targetId }, thunkAPI) => {
    try {
      const {
        user: {
          data: { _id: sourceId },
        },
      } = thunkAPI.getState();
      const { data } = await axios.post(`${BASE_URL}/users/follow`, {
        targetId,
        sourceId,
      });
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ targetId }, thunkAPI) => {
    try {
      const {
        user: {
          data: { _id: sourceId },
        },
      } = thunkAPI.getState();
      const { data } = await axios.post(`${BASE_URL}/users/follow`, {
        targetId,
        sourceId,
      });
      if (data.success) {
        return data;
      }
      return thunkAPI.rejectWithValue({ errorMessage: data.message });
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchRecentlyJoinedUsers = createAsyncThunk(
  "user/fetchRecentlyJoinedUsers",
  async (_, thunkAPI) => {
    try {
      const {
        user: {
          data: { _id: userId },
        },
      } = thunkAPI.getState();
      const { data } = await axios.get(
        `${BASE_URL}/users/get-recently-joined-users/${userId}`
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: null,
      name: null,
      username: null,
      email: null,
      profileUrl: null,
      followers: [],
      following: [],
    },
    retrievedUser: {
      _id: null,
      name: null,
      username: null,
      email: null,
      bio: null,
      profileUrl: null,
      followers: [],
      following: [],
    },
    token: null,
    isUserLoggedIn: false,
    loading: false,
    errorMessage: "",
    retrievedUserLoading: false,
    recentlyJoinedUsers: [],
    recentlyJoinedUsersLoading: false,
    initialLoading: true,
    profileTabsFetching: true,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.data = {
        _id: null,
        name: null,
        username: null,
        email: null,
        bio: null,
        profileUrl: null,
        followers: [],
        followings: [],
      };
      state.token = null;
      state.isUserLoggedIn = false;
      state.loading = false;
      state.errorMessage = "";
    },
    setUserFromLocalStorage: (state) => {
      let user;
      const jsonUser = localStorage.getItem("user");
      if (jsonUser) {
        user = JSON.parse(jsonUser);
      }
      const token = localStorage.getItem("token");
      if (user !== undefined && token !== null) {
        state.isUserLoggedIn = true;
        state.data = user;
        state.token = token;
      }
      state.initialLoading = false;
    },
    setInitialLoadingFalse: (state) => {
      state.initialLoading = false;
    },
  },
  extraReducers: {
    [loginUserAsync.pending]: (state) => {
      state.loading = true;
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUserLoggedIn = true;
      state.errorMessage = "";
      state.data = action.payload.user;
    },
    [loginUserAsync.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [signupUserAsync.pending]: (state) => {
      state.loading = true;
    },
    [signupUserAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUserLoggedIn = true;
      state.errorMessage = "";
      state.data = action.payload.user;
    },
    [signupUserAsync.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchUserFollowers.pending]: (state) => {
      state.profileTabsFetching = true;
      state.errorMessage = "";
    },
    [fetchUserFollowers.rejected]: (state, action) => {
      state.profileTabsFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchUserFollowers.fulfilled]: (state, action) => {
      state.profileTabsFetching = false;
      state.errorMessage = "";
      state.retrievedUser.followers = action.payload.followers;
    },
    [fetchUserFollowing.pending]: (state) => {
      state.profileTabsFetching = true;
      state.errorMessage = "";
    },
    [fetchUserFollowing.rejected]: (state, action) => {
      state.profileTabsFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchUserFollowing.fulfilled]: (state, action) => {
      state.profileTabsFetching = false;
      state.errorMessage = "";
      state.retrievedUser.following = action.payload.following;
    },
    [fetchUserInfo.pending]: (state) => {
      state.retrievedUserLoading = true;
      state.errorMessage = "";
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.retrievedUserLoading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.retrievedUserLoading = false;
      state.errorMessage = "";
      state.retrievedUser = action.payload.user;
    },
    [followUser.fulfilled]: (state, action) => {
      state.data.following.push(action.payload.targetUserId);
    },
    [unFollowUser.fulfilled]: (state, action) => {
      const index = state.data.following.indexOf(action.payload.targetUserId);
      state.data.following.splice(index, 1);
    },
    [fetchRecentlyJoinedUsers.pending]: (state) => {
      state.recentlyJoinedUsersLoading = true;
    },
    [fetchRecentlyJoinedUsers.rejected]: (state, action) => {
      state.recentlyJoinedUsersLoading = false;
      state.errorMessage = action.payload.errorMessage;
    },
    [fetchRecentlyJoinedUsers.fulfilled]: (state, action) => {
      state.recentlyJoinedUsers = action.payload.users;
      state.recentlyJoinedUsersLoading = false;
    },
  },
});

export const { logoutUser, setUserFromLocalStorage, setInitialLoadingFalse } =
  userSlice.actions;

export default userSlice.reducer;
