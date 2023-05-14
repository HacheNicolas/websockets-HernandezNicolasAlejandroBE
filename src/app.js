import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager("./src/products.json");

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();
  if (req.query && limit) {
    const productsFilteredByLimit = products.slice(0, limit);
    return res.json({
      status: "success",
      msg: "Se muestran los primeros " + limit + " productos.",
      data: productsFilteredByLimit,
    });
  } else {
    return res.json({
      status: "success",
      msg: "Se muestran todos los productos.",
      data: products,
    });
  }
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = productManager.getProductById(id);
  if (product) {
    return res.json({
      status: "success",
      msg: "Producto encontrado con éxito.",
      data: { product },
    });
  } else {
    return res.json({
      status: "error",
      msg: "Este producto no existe.",
      data: {},
    });
  }
});

app.get("*", (req, res) => {
  return res.json({
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
