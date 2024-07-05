import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import {
  IFetchAllResponse,
  IProductState,
  IProductSubmit,
  IProductUpdate,
  IProductViewResponse,
  ISubmitResponse,
} from "../types/product";

const initialState: IProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
  successMessage: "",
};

export const fetchAll = createAsyncThunk<
  IFetchAllResponse,
  void,
  { rejectValue: string }
>("product/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/product/view-all");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const viewProduct = createAsyncThunk<
  IProductViewResponse,
  string,
  { rejectValue: string }
>("product/view", async (productId, thunkAPI) => {
  try {
    const response = await axios.get("/product/view/" + productId);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const addProduct = createAsyncThunk<
  ISubmitResponse,
  IProductSubmit,
  { rejectValue: string }
>("product/add", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post("/product/create", credentials);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateProduct = createAsyncThunk<
  ISubmitResponse,
  IProductUpdate,
  { rejectValue: string }
>("product/update", async (credentials, thunkAPI) => {
  try {
    const { productId, ...data } = credentials;
    const response = await axios.patch("/product/update/" + productId, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deleteProduct = createAsyncThunk<
  ISubmitResponse,
  string,
  { rejectValue: string }
>("product/delete", async (productId, thunkAPI) => {
  try {
    const response = await axios.delete("/product/delete/" + productId);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(
        fetchAll.fulfilled,
        (state, action: PayloadAction<IFetchAllResponse>) => {
          state.loading = false;
          state.products = action.payload.data;
        }
      )
      .addCase(
        fetchAll.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "failed to fetch";
        }
      )

      // view product
      .addCase(viewProduct.pending, (state) => {
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(
        viewProduct.fulfilled,
        (state, action: PayloadAction<IProductViewResponse>) => {
          state.product = action.payload.data;
        }
      )
      .addCase(
        viewProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "failed to fetch";
        }
      )

      // add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<ISubmitResponse>) => {
          state.loading = false;
          state.success = true;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(
        addProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "failed to add";
          state.success = false;
          state.successMessage = "";
        }
      )

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<ISubmitResponse>) => {
          state.loading = false;
          state.success = true;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(
        updateProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "failed to update";
          state.success = false;
          state.successMessage = "";
        }
      )

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
        state.success = false;
        state.successMessage = "";
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<ISubmitResponse>) => {
          state.success = true;
          state.successMessage = action.payload.message;
          state.products = state.products.filter(
            (product) => product._id !== action.payload.data._id
          );
        }
      )
      .addCase(
        deleteProduct.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "failed to delete";
          state.success = false;
          state.successMessage = "";
        }
      );
  },
});

export default productSlice.reducer;
