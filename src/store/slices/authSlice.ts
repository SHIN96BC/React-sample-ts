import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  token: string;
  isLogin?: boolean;
};

const initialState = {
  token: '',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: State, action: PayloadAction<State>) {
      return {...initialState, ...action.payload, isLogin: true};
    },
    logout() {
      return {...initialState, isLogin: false};
    }
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
