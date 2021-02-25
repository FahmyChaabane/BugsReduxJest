import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    ADD_USER: (users, action) => {
      users.push(action.payload);
    },
  },
});

export const { ADD_USER } = slice.actions;
export default slice.reducer;
