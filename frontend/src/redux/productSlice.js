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
      const response = await axios.post(API_URL + 'products', product);
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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (product, thunkAPI) => {
    try {
      const response = await axios.delete(API_URL + 'products/' + 18);
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

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, thunkAPI) => {
    try {
      const response = await axios.put(API_URL + 'products/' + 19, {
        name: 'zye',
        price: 11111,
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
    // getProduct
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
      state.message = 'errror get ';
    })
    // createProduct
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
      state.message = 'error create';
    })
    // deleteProduct
    .addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.filter(product => {
        return product.id !== action.payload.id;
      });
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.hasError = true;
      state.message = 'error deleted';
    })
    // updateProduct
    .addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.map(product => {
        return product.id === action.payload.id ? action.payload : product;
      });
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.hasError = true;
      state.message = 'error update';
    });

  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
