import { TProductResponse } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IProductSlice {
  products: TProductResponse | null;
  productCategories: string[] | null;
}

// Define the initial state using that type
const initialState: IProductSlice = {
  products: null,
  productCategories: null,
};

export const productSlice = createSlice({
  name: "location",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProductResponse>) => {
      state.products = action.payload;
    },
    setProductCategories: (state, action: PayloadAction<string[]>) => {
      state.productCategories = action.payload;
    },
  },
});

export const { setProducts, setProductCategories } = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default productSlice.reducer;
