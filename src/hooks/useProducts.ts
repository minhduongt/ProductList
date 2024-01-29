import productApi from "@/apis/product";
import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect, useState } from "react";
import { setProducts } from "@/redux/store/productSlice";
import { TRequestParams } from "@/types";
import { TProductResponse } from "@/types/product";

type Props = {
  params?: TRequestParams;
  category?: string;
};

const useProducts = ({ params, category }: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product);
  const [error, setError] = useState("");
  const data = state.products;
  const fetchData = async (searchKey?: string) => {
    try {
      var newData: TProductResponse;
      if (searchKey && searchKey !== "") {
        newData = await productApi.getSearchProducts(searchKey);
        dispatch(setProducts(newData));
      } else if (category && category !== "") {
        newData = await productApi.getProductByCategory(category, params);
        dispatch(setProducts(newData));
      } else {
        newData = await productApi.getProducts(params);
        dispatch(setProducts(newData));
      }
      return newData;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, [params?.limit, category]);

  return { data, error, fetchData };
};

export default useProducts;
