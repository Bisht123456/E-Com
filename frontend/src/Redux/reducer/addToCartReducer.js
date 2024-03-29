import { createSlice } from "@reduxjs/toolkit";
import { addToCartAction } from "../action/addToCartAction";
import { myCartList } from "../action/getProductDetailAction";

const initialState = {
  isLoading: false,
  listdata: [],
  error: "",
  mycart: [],
};
const AddToCartFile = createSlice({
  name: "Productdata",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(addToCartAction.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(addToCartAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listdata = action?.payload;
      state.error = "";
    });
    bulider.addCase(addToCartAction.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
    bulider.addCase(myCartList.fulfilled, (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.mycart = action.payload.userProductDetails;
    });
  },
});

export default AddToCartFile.reducer;

