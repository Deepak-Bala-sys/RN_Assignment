import {createSlice} from '@reduxjs/toolkit';
import {fetchAppList} from '../../services/PostAPI';

type deviceState = {
  data: any;
  loading: boolean;
  error: null | string;
};
// Set the initial state for the applist slice
const initialState: deviceState = {
  data: [],
  loading: false,
  error: null,
};
const AppListSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAppList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppList.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data?.app_list;
      })
      .addCase(fetchAppList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const AppListAction = AppListSlice.actions;
export const AppListReducer = AppListSlice.reducer;
