import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const templatesAsync = createAsyncThunk(
    'category/fetchtemplates',
    async (FetchURL: string)  => {
      const response:any = await axios.get(FetchURL);
      return response;
  }
)

interface templatesInterface {
  dataTemplates: any,
  numberPost:number,
  status: string
}

const initialState:templatesInterface =  {
  dataTemplates: [],
  numberPost: 0,
  status: 'idle'
};

export const TemplatesSlice = createSlice({
  name: 'templates',
  // Thêm 1 số state như trạng thái loading, báo lỗi và thông tin user đang đăng nhập
  initialState,
  // Các action bình thường (sync action)
  reducers: {
    // Logout không gọi API mà chỉ đơn giản là cập nhật state
    numberPost: (state, action) => {
      state.numberPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(templatesAsync.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(templatesAsync.fulfilled, (state, action) => {
        state.status = 'loaded';
        let numPosts:number = action.payload.request.getResponseHeader('x-wp-total');
        state.numberPost = numPosts;
        state.dataTemplates = action.payload.data;
      })
      ;
  },
});

export const dataAPITemplates = (state: RootState) => state.templates.dataTemplates;
export const dataTotalTemplate = (state: RootState) => state.templates.numberPost;
export const statusFetchPosts = (state: RootState) => state.templates.status;

export default TemplatesSlice.reducer;