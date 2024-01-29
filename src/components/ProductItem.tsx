import { TProduct } from "@/types/product";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

type TProductItem = {
  product: TProduct;
};

const ProductItem = ({ product }: TProductItem) => {
  return (
    <Card sx={{ maxWidth: 500, height: 480 }}>
      <CardMedia
        sx={{
          height: 300,
          ":hover": { height: "100%", backgroundSize: "contain" },
          transition: "ease-in-out 0.75s",
        }}
        image={product?.images[0]}
        title={product?.title}
      />
      <CardContent>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
        </Stack>
        <Stack justifyContent={"flex-end"} flexDirection={"row"}>
          <Stack alignItems={"flex-end"}>
            <Typography gutterBottom variant="body1" color="#e7c159">
              {`(-${product?.discountPercentage}%)`}
            </Typography>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              sx={{ gap: 0.5 }}
            >
              <Typography
                gutterBottom
                variant="body2"
                color="#c2c2c2"
                sx={{ textDecoration: "line-through" }}
              >
                {Math.round(
                  (product?.price * product?.discountPercentage) / 100
                ) + product?.price}
                $
              </Typography>
              <Typography gutterBottom variant="h5">
                {product?.price}$
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
