import productApi from "@/apis/product";
import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect, useState } from "react";
import { setProductCategories } from "@/redux/store/productSlice";
import { TRequestParams } from "@/types";

type Props = {
  params?: TRequestParams;
};

const useProductCategories = ({ params = {} }: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product);
  const [error, setError] = useState("");
  const data = state.productCategories;
  const fetchData = async () => {
    try {
      var newData: string[];
      newData = await productApi.getProductCategories(params);
      dispatch(setProductCategories(newData));

      return newData;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, fetchData };
};

export default useProductCategories;
