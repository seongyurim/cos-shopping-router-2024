import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  id: '',
  password: '',
  authenticate: false
};

const authenticateSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    loginSuccess(state, action) {
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = true;
    },
    logoutSuccess(state) {
      state.id = '';
      state.password = '';
      state.authenticate = false;
    }
  }
});

export const authenticateActions = authenticateSlice.actions; // 액션 내보내기
export default authenticateSlice.reducer; // 리듀서 내보내기