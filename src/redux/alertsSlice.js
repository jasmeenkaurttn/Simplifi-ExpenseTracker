import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
   name:'alerts',
   initialState: {
    loading: false,
   },
   reducers: {
    // functions for show and hide loader
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    }
   }
});

export const {ShowLoading, HideLoading} = alertSlice.actions;
export default alertSlice.reducer;