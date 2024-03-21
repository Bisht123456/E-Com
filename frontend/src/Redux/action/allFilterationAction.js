import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBasePath } from "../config/Config";

export const axiosInstance = axios.create({
  baseURL: apiBasePath,
});


export const AllFilterationData = createAsyncThunk(
  "filterationAlldata",
  async (payload) => {
    const {
      categoryId,
      subcategoryId,
      typesubcategory_id,
      brandId,
      minPrice,
      maxPrice,
    } = payload;
    console.log(payload, "payloadpayload");
    return await axiosInstance.post(
      `/filteralldata?categoryId=${categoryId}&subcategoryId=${subcategoryId}&typesubcategory_id=${typesubcategory_id}&brandId=${brandId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }
);