import express from "express";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Error, esta ruta no existe.",
    data: {},
  });
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}. Link: http://localhost:8080/`
  );
});
