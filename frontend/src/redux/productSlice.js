import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const initialState = {
  products: [],
  hasError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (product, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + 'products');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product, thunkAPI) => {
    try {
      console.log('PRODUCT', product);
      const response = await axios.post(API_URL + 'products', {
        name: 'testName',
        price: 20,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products.push(...action.payload);
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.hasError = true;
      console.log('ERROR', action.payload);
      state.message = 'ERROR MESSAGE';
    })
    .addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products.push(action.payload);
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.hasError = true;
      console.log('ERROR', action.payload);
      state.message = 'ERROR MESSAGE';
    });

  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
