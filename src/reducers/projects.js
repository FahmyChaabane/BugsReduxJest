import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    ADD_PROJECT: (projects, action) => {
      projects.push(action.payload);
    },
  },
});

export const { ADD_PROJECT } = slice.actions;
export default slice.reducer;
