import {configureStore} from '@reduxjs/toolkit';
import {AppListReducer} from '../slices/AppListSlice';

export const store = configureStore({
  reducer: {
    app: AppListReducer,
  },
});
