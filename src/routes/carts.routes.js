import CartManager from "../CartManager.js";
import { productManager } from "./products.routes.js";
import express from "express";

export const routerCarts = express.Router();

const cartManager = new CartManager("./src/carts.json");

routerCarts.post("/", (req, res) => {
  const newCart = cartManager.addCart();
  return res.status(201).json({
    status: "success",
    msg: "Carrito creado con éxito.",
    data: newCart,
  });
});

routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const newProduct = await productManager.getProductById(pid);
  if (newProduct) {
    try {
      const addedProduct = await cartManager.addProduct(cid, pid);
      return res.status(201).json({
        status: "success",
        msg: "Producto agregado al carrito con éxito.",
        data: addedProduct,
      });
    } catch (e) {
      return res.status(404).json({
        status: e.name,
        msg: e.message,
        data: {},
      });
    }
  } else {
    return res.status(404).json({
      status: "error",
      msg: "Este producto no existe.",
      data: {},
    });
  }
});

routerCarts.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);
  try {
    const cartProducts = await cartManager.getProductsByCartId(cid);
    return res.status(201).json({
      status: "success",
      msg: "Se muestran los productos del carrito con el id: " + cid,
      data: cartProducts,
    });
  } catch (e) {
    return res.status(404).json({
      status: e.name,
      msg: e.message,
      data: {},
    });
  }
});
