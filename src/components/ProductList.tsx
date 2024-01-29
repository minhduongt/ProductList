import useProducts from "@/hooks/useProducts";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import InfiniteScrollWrapper from "./InfiniteScrollWrapper";
import useProductCategories from "@/hooks/useProductCategories";

const ProductList = () => {
  const [limit, setLimit] = useState(20);
  const [inputSearch, setInputSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { data: productData, fetchData: fetchProducts } = useProducts({
    params: { limit: limit },
    category: sortKey,
  });
  const { data: categories } = useProductCategories({});

  useEffect(() => {
    try {
      if (inputSearch !== "") {
        setSortKey("");
        const delayInputTimeoutId = setTimeout(async () => {
          const res = await fetchProducts(inputSearch);
          if (res && res?.products?.length < 1) {
            setMessage("No products found.");
          } else {
            setMessage("");
          }
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
      } else if (productData !== null) {
        fetchProducts();
        setMessage("");
      }
    } catch (err) {
      console.log("error", err);
      setError("Error occur!");
    }
  }, [inputSearch, 500]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputSearch(event.target.value);
  };
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
      <Stack
        sx={{
          width: "100%",
          paddingY: 2,
          marginY: 2,
          borderBottom: "solid 1px #000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Product List</Typography>
      </Stack>
      {/* Action */}
      {error !== "" && (
        <Typography color="red" py={2}>
          {error}
        </Typography>
      )}
      {productData && (
        <Stack
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          {categories && (
            <FormControl>
              <InputLabel id="select-sort-category-label">Sort</InputLabel>
              <Select
                id="select-sort-category"
                label="Sort"
                placeholder="Sort by category"
                value={sortKey}
                onChange={(e) => setSortKey(String(e.target.value))}
                sx={{ width: 200 }}
              >
                <MenuItem value={""}>{"All"}</MenuItem>
                {categories?.map((cate) => (
                  <MenuItem key={cate} value={cate}>
                    {cate.replace("-", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Search"
            placeholder="Enter a product name..."
            sx={{ width: "30vw", minWidth: 300 }}
            onChange={handleSearchInputChange}
          />
        </Stack>
      )}
      {message !== "" && <Typography py={2}>{message}</Typography>}
      {/* List */}

      {productData ? (
        inputSearch !== "" ? (
          <Grid container spacing={2} pt={5}>
            {productData.products?.map((product) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={productData.products.length >= 4 ? 3 : "auto"}
                key={product.id}
              >
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <InfiniteScrollWrapper
            loader={<CircularProgress />}
            fetchMore={() => setLimit((prev) => prev + 20)}
            hasMore={productData.products?.length < productData.total}
            endMessage={<Typography variant="h6">{"End."}</Typography>}
          >
            <Grid container spacing={4} pt={5}>
              {productData.products?.map((product) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={productData.products.length >= 4 ? 3 : "auto"}
                  key={product.id}
                >
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScrollWrapper>
        )
      ) : (
        <Stack alignItems={"center"} p={5}>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default ProductList;
