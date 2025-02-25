import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  isAuthenticated: boolean | null;
  data: Record<string, any> | null;
  token: string | null;
}

interface AuthState {
  user: User;
}

// Load user from AsyncStorage and decode the token
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const token = await AsyncStorage.getItem("userJwt");
  const userObj = await AsyncStorage.getItem("userData");
  if (token && userObj) {
    return { isAuthenticated: true, data: JSON.parse(userObj), token };
  }
  return { isAuthenticated: false, data: {}, token: null };
});

// Save user data to AsyncStorage
export const saveUser = createAsyncThunk(
  "auth/saveUser",
  async ({ user, token }: { user: Record<string, any>; token: string }) => {
    await AsyncStorage.setItem("userJwt", token);
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    return { isAuthenticated: true, data: user, token };
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ user }: { user: Record<string, any> }) => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    return user;
  }
);

const initialState: AuthState = {
  user: {
    isAuthenticated: null,
    data: null,
    token: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.isAuthenticated = false;
      state.user.data = null;
      state.user.token = null;
      AsyncStorage.removeItem("userJwt");
      AsyncStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(
      saveUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<Record<string, any>>) => {
        state.user.data = action.payload;
      }
    );
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
