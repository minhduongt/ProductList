import { request } from "./utils";
import { TProductResponse } from "@/types/product";

export const getProducts = (params?: any): Promise<TProductResponse> =>
  request.get("/product", { params }).then((res) => res.data);

export const getSearchProducts = (
  searchKey?: string
): Promise<TProductResponse> =>
  request
    .get("/product/search", { params: { q: searchKey } })
    .then((res) => res.data);

export const getProductCategories = (params?: any): Promise<string[]> =>
  request.get("/product/categories", { params }).then((res) => res.data);

export const getProductByCategory = (
  category: string,
  params?: any
): Promise<TProductResponse> =>
  request
    .get(`/product/category/${category}`, { params })
    .then((res) => res.data);

const productApi = {
  getProducts,
  getSearchProducts,
  getProductByCategory,
  getProductCategories,
};

export default productApi;
