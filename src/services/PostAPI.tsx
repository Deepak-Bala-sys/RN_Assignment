import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://navkiraninfotech.com/g-mee-api/api/v1/apps/list?kid_id=378'; // Replace with your API endpoint

export const fetchAppList = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.post(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
});