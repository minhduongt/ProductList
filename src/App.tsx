import { Box } from "@mui/material";
import "./App.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Box sx={{ px: "2rem" }}>
      <ProductList />
    </Box>
  );
}

export default App;
