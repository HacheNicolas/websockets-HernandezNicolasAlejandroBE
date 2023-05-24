import ProductManager from "../ProductManager.js";
import express from "express";

export const productManager = new ProductManager("./src/products.json");

export const routerProducts = express.Router();

routerProducts.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    const productsFilteredByLimit = await products.slice(0, limit);
    return res.status(200).json({
      status: "success",
      msg: "Se muestran los primeros " + limit + " productos.",
      data: productsFilteredByLimit,
    });
  } else {
    return res.status(200).json({
      status: "success",
      msg: "Se muestran todos los productos.",
      data: products,
    });
  }
});

routerProducts.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await productManager.getProductById(id);
  if (product) {
    return res.status(200).json({
      status: "success",
      msg: "Producto encontrado con éxito.",
      data: product,
    });
  } else {
    return res.status(404).json({
      status: "error",
      msg: "Este producto no existe.",
      data: {},
    });
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);

  try {
    const erasedProduct = await productManager.deleteProduct(id);
    return res.status(200).json({
      status: "success",
      msg: "Se eliminó el producto cuyo id era: " + id,
      data: erasedProduct,
    });
  } catch (e) {
    return res.status(404).json({
      status: e.name,
      msg: e.message,
      data: {},
    });
  }
});

routerProducts.post("/", (req, res) => {
  const newProduct = req.body;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = newProduct;
  try {
    const createdProduct = productManager.addProduct(
      title,
      description,
      code,
      Number(price),
      Boolean(status),
      Number(stock),
      category,
      thumbnail
    );
    return res.status(201).json({
      status: "success",
      msg: "Producto creado con éxito.",
      data: createdProduct,
    });
  } catch (e) {
    return res.status(400).json({
      status: e.name,
      msg: e.message,
      data: {},
    });
  }
});

routerProducts.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const newData = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(id, newData);
    return res.status(201).json({
      status: "success",
      msg: "Producto modificado con éxito.",
      data: updatedProduct,
    });
  } catch (e) {
    return res.status(404).json({
      status: e.name,
      msg: e.message,
      data: {},
    });
  }
});
